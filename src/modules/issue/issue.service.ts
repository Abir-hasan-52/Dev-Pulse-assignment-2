import { pool } from "../../db";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (
  payload: IIssue,
  reporter_id: number
) => {

  const {
    title,
    description,
    type,
  } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues(
        title,
        description,
        type,
        reporter_id
      )
      VALUES($1,$2,$3,$4)
      RETURNING *
    `,
    [
      title,
      description,
      type,
      reporter_id,
    ]
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (
  query: Record<string, unknown>
) => {

  // query params
  const sort =
    query.sort === "oldest"
      ? "ASC"
      : "DESC";

  const type = query.type;
  const status = query.status;

  // dynamic query
  let sql = `
    SELECT *
    FROM issues
  `;

  const conditions: string[] = [];
  const values: unknown[] = [];

  // filtering
  if (type) {
    values.push(type);

    conditions.push(
      `type = $${values.length}`
    );
  }

  if (status) {
    values.push(status);

    conditions.push(
      `status = $${values.length}`
    );
  }

  // add WHERE
  if (conditions.length > 0) {
    sql += `
      WHERE ${conditions.join(" AND ")}
    `;
  }

  // sorting
  sql += `
    ORDER BY created_at ${sort}
  `;

  // get issues
  const issuesResult =
    await pool.query(sql, values);

  const issues = issuesResult.rows;

  // collect reporter ids
  const reporterIds = [
    ...new Set(
      issues.map(
        issue => issue.reporter_id
      )
    ),
  ];

  // get users separately (NO JOIN)
  const usersResult =
    await pool.query(
      `
        SELECT id, name, role
        FROM users
        WHERE id = ANY($1)
      `,
      [reporterIds]
    );

  const users = usersResult.rows;

  // merge manually
  const finalIssues = issues.map(issue => {

    const reporter = users.find(
      user => user.id === issue.reporter_id
    );

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,

      reporter: {
        id: reporter?.id,
        name: reporter?.name,
        role: reporter?.role,
      },

      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return finalIssues;
};


const getSingleIssueFromDB = async (
  id: string
) => {

  // get issue
  const issueResult =
    await pool.query(
      `
        SELECT *
        FROM issues
        WHERE id = $1
      `,
      [id]
    );

  // issue exists?
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // get reporter separately
  const userResult =
    await pool.query(
      `
        SELECT id, name, role
        FROM users
        WHERE id = $1
      `,
      [issue.reporter_id]
    );

  const reporter =
    userResult.rows[0];

  // final response
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: {
      id: reporter?.id,
      name: reporter?.name,
      role: reporter?.role,
    },

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssueIntoDB = async (
  issueId: string,
  payload: {
    title?: string;
    description?: string;
    type?: "bug" | "feature_request";
    status?: "open" | "in_progress" | "resolved";
  },
  user: {
    id: string;
    role: string;
  }
) => {

  // 1. find issue
  const issueResult =
    await pool.query(
      `
        SELECT *
        FROM issues
        WHERE id = $1
      `,
      [issueId]
    );

  // issue exists?
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // 2. authorization

  // contributor rules
  if (user.role === "contributor") {

    // own issue?
    if (issue.reporter_id !== user.id) {
      throw new Error(
        "Forbidden! Not your issue"
      );
    }

    // issue must be open
    if (issue.status !== "open") {
      throw new Error(
        "Only open issues can be updated"
      );
    }
  }

  // 3. prepare update values

  const title =
    payload.title ?? issue.title;

  const description =
    payload.description ??
    issue.description;

  const type =
    payload.type ?? issue.type;

  // only maintainer can update status
  let status = issue.status;

  if (
    user.role === "maintainer" &&
    payload.status
  ) {
    status = payload.status;
  }

  // 4. update query
  const result =
    await pool.query(
      `
        UPDATE issues
        SET
          title = $1,
          description = $2,
          type = $3,
          status = $4,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *
      `,
      [
        title,
        description,
        type,
        status,
        issueId,
      ]
    );

  return result.rows[0];
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB
};