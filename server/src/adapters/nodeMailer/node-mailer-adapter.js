"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodeMailerMailAdapter {
    async sendMail({ subject, body }) {
        const transport = nodemailer_1.default.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "74bfd8450cf980",
                pass: "59d8e67b021dae"
            }
        });
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Italo Costa <italocc16@gmail.com>',
            subject,
            html: body
        });
    }
}
exports.NodeMailerMailAdapter = NodeMailerMailAdapter;
