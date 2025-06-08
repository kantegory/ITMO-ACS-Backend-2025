"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepository = void 0;
//repository/index.ts
const data_source_1 = require("../data-source");
const Message_1 = require("../entity/Message");
const MessageService_1 = require("../service/MessageService");
exports.messageRepository = new MessageService_1.MessageService(data_source_1.AppDataSource.getRepository(Message_1.Message));
//# sourceMappingURL=index.js.map