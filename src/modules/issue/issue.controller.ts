import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../utility/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user!.id;

    const result = await issueService.createIssueIntoDB(req.body, reporter_id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
    // res.status(201).json({
    //   success: true,
    //   message: "Issue created successfully",
    //   data: result,
    // });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
    // res.status(500).json({
    //   success: false,
    //   message: errorMessage,
    //   errors: errorMessage,
    // });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(req.query);

    if (result.length === 0) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "No issues found",
        data: [],
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue fetched successfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   data: result,
    // });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
    // res.status(500).json({
    //   success: false,
    //   message: errorMessage,
    // });
  }
};
const getsingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue get successfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   data: result,
    // });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
    // res.status(500).json({
    //   success: false,
    //   message: errorMessage,
    // });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = req.user!.id;

    const userRole = req.user!.role;

    const result = await issueService.updateIssueIntoDB(
      id as string,
      req.body,
      {
        id: userId,
        role: userRole,
      },
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   message: "Issue updated successfully",
    //   data: result,
    // });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
    // res.status(500).json({
    //   success: false,
    //   message: errorMessage,
    // });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await issueService.deleteIssueFromDB(id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Issue deleted successfully",
    // });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: errorMessage,
      errors: errorMessage,
    });
    // res.status(500).json({
    //   success: false,
    //   message: errorMessage,
    // });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getsingleIssue,
  updateIssue,
  deleteIssue,
};
