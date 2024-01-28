/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

// const corsOptions = {
//   // origin: "https://flower-client.vercel.app",
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
//   credentials: true,
// };

const corsOptions = {
  origin: (origin: any, callback: any) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://flower-client.vercel.app",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  credentials: true,
};
+app.use(cors(corsOptions));

// parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
