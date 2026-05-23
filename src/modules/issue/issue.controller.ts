import type { Request, Response } from "express";
import { issueService } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user!.id;

    const result = await issueService.createIssueIntoDB(req.body, reporter_id);

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
const getsingleIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string)
     res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getsingleIssue
};
