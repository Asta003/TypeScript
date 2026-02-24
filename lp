дз

№ 8

class Student {
    private name: string;
    private age: number;
    private subject: string;

    constructor(name: string, age: number, subject: string) {
        this.name = name;
        this.age = age;
        this.subject = subject;
    }

    info(): string {
        return ${this.name}, ${this.age}, ${this.subject};
    }
}

const student1 = new Student("Иван", 17, "math");
const student2 = new Student("Ольга", 16, "physics");

console.log(student1.info()); 
console.log(student2.info());

дз 2

№ 8

export abstract class BaseNotification {
  constructor(
    public priority: number,
    public retryCount: number = 0
  ) {}
  abstract send(): Promise<{ success: boolean }>;
}
export class EmailNotification extends BaseNotification {
  constructor(priority: number, retryCount: number = 0) {
    super(priority, retryCount);
  }
  async send(): Promise<{ success: boolean }> {
    return { success: Math.random() < 0.8 };
  }
}
export class SMSNotification extends BaseNotification {
  constructor(priority: number, retryCount: number = 0) {
    super(priority, retryCount);
  }
  async send(): Promise<{ success: boolean }> {
    return { success: Math.random() < 0.95 };
  }
}
type RetryResult<T> = { result: T; retriesUsed: number };
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  attempt: number = 1
): Promise<RetryResult<T>> {
  try {
    const result = await fn();
    return { result, retriesUsed: attempt - 1 };
  } catch (err) {
    if (attempt <= maxRetries) {
      return retry(fn, maxRetries, attempt + 1);
    }
    throw err;
  }
}
export interface SendResult {
  notification: BaseNotification;
  success: boolean;
  retriesUsed: number;
}
export async function sendBatch(
  notifications: BaseNotification[],
  maxRetries: number
): Promise<SendResult[]> {
  const sorted = [...notifications].sort((a, b) => a.priority - b.priority);
  const results: SendResult[] = [];
  for (const notif of sorted) {
    try {
      const { result, retriesUsed } = await retry(() => notif.send(), maxRetries);
      results.push({
        notification: notif,
        success: result.success,
        retriesUsed
      });
    } catch {
      results.push({
        notification: notif,
        success: false,
        retriesUsed: maxRetries
      });
    }
  }
  return results;
}

дз 3

  №2

abstract class OrderLine {
    constructor(
        public name: string,
        public price: number,
        public quantity: number
    ) {}

    total(): number {
        return this.price * this.quantity;
    }

    abstract getType(): string;
}

class ServiceLine extends OrderLine {
    getType(): string {
        return "service";
    }
}

class PartLine extends OrderLine {
    private taxRate: number = 0.20; // 20% налог/наценка

    constructor(
        name: string,
        price: number,
        quantity: number,
        taxRate?: number
    ) {
        super(name, price, quantity);
        if (taxRate !== undefined) {
            this.taxRate = taxRate;
        }
    }

    total(): number {
        const baseTotal = super.total();
        return baseTotal * (1 + this.taxRate);
    }

    getType(): string {
        return "part";
    }

    getTaxAmount(): number {
        return this.price * this.quantity * this.taxRate;
    }
}

const service = new ServiceLine("Консультация", 1000, 2);
const part = new PartLine("Тормозные колодки", 2500, 4, 0.25); // 25% наценка
const partDefault = new PartLine("Масло моторное", 800, 5); // 20% наценка по умолчанию

console.log(Услуга: ${service.name}, итог: ${service.total()} руб.);
console.log(Запчасть: ${part.name}, итог: ${part.total()} руб. (налог: ${part.getTaxAmount()} руб.));
console.log(Запчасть: ${partDefault.name}, итог: ${partDefault.total()} руб. (налог: ${partDefault.getTaxAmount()} руб.));

console.log(Тип услуги: ${service.getType()});
console.log(Тип запчасти: ${part.getType()});
