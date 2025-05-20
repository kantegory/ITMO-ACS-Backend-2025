import {
  Get, Post, Patch, Delete, Param, Body, Authorized, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Order } from "../entities/Order";
import { CreateOrderDto } from "../dto/order/create-order.dto";
import { UpdateOrderDto } from "../dto/order/update-order.dto";
import { OrderResponseDto } from "../dto/order/order-response.dto";
import { OrderService } from "../services/orderService";
import { BaseController } from "../common/baseController";

@JsonController("/orders")
export class OrderController extends BaseController<Order> {
  private readonly orderService: OrderService;

  constructor() {
    super(new OrderService());
    this.orderService = this.service as OrderService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all orders" })
  @ResponseSchema(OrderResponseDto, { isArray: true })
  async getAll() {
    return this.orderService.findAllWithRelations();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get order by ID" })
  @ResponseSchema(OrderResponseDto)
  async getById(@Param("id") id: number) {
    const order = await this.orderService.findOneWithRelations(id);
    if (!order) {
      return { error: "Not found" };
    }
    return order;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new order" })
  @ResponseSchema(OrderResponseDto)
  async create(@Body({ required: true }) data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update an order" })
  @ResponseSchema(OrderResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateOrderDto) {
    const updated = await this.orderService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete an order" })
  async remove(@Param("id") id: number) {
    await this.orderService.remove(id);
    return { message: "Deleted successfully" };
  }
}