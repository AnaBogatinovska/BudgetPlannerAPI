"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_details_dal_1 = __importDefault(require("../../../data_access_layer/queries/expense-details-dal"));
class UpdateExpenseController {
    updateExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expenseToUpdate = {
                    id: Number(req.params.expenseId),
                    day: req.body.day,
                    name: req.body.name,
                    amount: req.body.amount,
                    categoryId: req.body.categoryId,
                };
                yield expense_details_dal_1.default.updateExpense(expenseToUpdate);
                res.status(200).json({
                    success: true,
                    message: "Expense updated successfully.",
                    expense: req.params.expenseId,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports.default = UpdateExpenseController;
