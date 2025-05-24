import {
  Get, Post, Patch, Delete, Param, Body, Authorized, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Payment } from "../entities/Payment";
import { CreatePaymentDto } from "../dto/payment/create-payment.dto";
import { UpdatePaymentDto } from "../dto/payment/update-payment.dto";
import { PaymentResponseDto } from "../dto/payment/payment-response.dto";
import { PaymentService } from "../services/paymentService";
import { BaseController } from "../common/baseController";

@JsonController("/payments")
export class PaymentController extends BaseController<Payment> {
  private readonly paymentService: PaymentService;

  constructor() {
    super(new PaymentService());
    this.paymentService = this.service as PaymentService;
  }

  @Get("/")
  @Authorized()
  @OpenAPI({ summary: "Get all payments" })
  @ResponseSchema(PaymentResponseDto, { isArray: true })
  async getAll() {
    return this.paymentService.findAllWithRelations();
  }

  @Get("/:id")
  @Authorized()
  @OpenAPI({ summary: "Get payment by ID" })
  @ResponseSchema(PaymentResponseDto)
  async getById(@Param("id") id: number) {
    const payment = await this.paymentService.findOneWithRelations(id);
    if (!payment) {
      return { error: "Not found" };
    }
    return payment;
  }

  @Post("/")
  @Authorized()
  @OpenAPI({ summary: "Create a payment" })
  @ResponseSchema(PaymentResponseDto)
  async create(@Body({ required: true }) data: CreatePaymentDto) {
    return this.paymentService.create(data);
  }

  @Patch("/:id")
  @Authorized()
  @OpenAPI({ summary: "Update a payment" })
  @ResponseSchema(PaymentResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdatePaymentDto) {
    const updated = await this.paymentService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @Authorized()
  @OpenAPI({ summary: "Delete a payment" })
  async remove(@Param("id") id: number) {
    await this.paymentService.remove(id);
    return { message: "Deleted successfully" };
  }
}