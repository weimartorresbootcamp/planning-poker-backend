import { Request, Response } from 'express';
import questionModel from '../models/question';

export async function getQuestions(req: Request, res: Response): Promise<Response> {
    const questions = await questionModel.find({ sessionId: req.params.id });

    return res.json(questions);
}

export async function createQuestion(req: Request, res: Response): Promise<Response> {
    const { question } = req.body;

    const newQuestion = new questionModel({
        sessionId: req.params.id,
        question: question
    });

    const questionResp = await newQuestion.save();
    
    return res.json({
        message: 'Question successfully created',
        questionResp
    });
}

export async function deleteQuetion(req: Request, res: Response): Promise<Response> {
    const deletedQuestion = await questionModel.findByIdAndRemove(req.params.id);

    return res.json({
        message: "Question deleted",
        deletedQuestion
    });
}

export async function deleteQuestions(sessionId: string): Promise<any> {
    const deletedQuestions = await questionModel.deleteMany({ sessionId: sessionId });

    return deletedQuestions;
}