import { Document, Model, FilterQuery } from 'mongoose';
import { TransactionSession } from './transaction.manager';

export interface IEntityOptions {
  transaction?: TransactionSession;
}

export abstract class EntityRepository<D extends Document> {
  protected constructor(private readonly entityModel: Model<D>) {}
  private readonly defaultProjection = {};

  create(data: Partial<D>, options: IEntityOptions = {}) {
    if (options.transaction) {
      return this.entityModel.create([data], {
        session: options.transaction?.session,
      });
    }

    return this.entityModel.create(data);
  }

  async exists(filter: FilterQuery<D>): Promise<boolean> {
    const result = await this.entityModel.exists(filter).lean();
    return Boolean(result);
  }

  find(filter: FilterQuery<D> = {}) {
    return this.entityModel.find(filter, {
      ...this.defaultProjection,
    });
  }

  findOneById(id: string) {
    return this.entityModel
      .findById(id, {
        ...this.defaultProjection,
      })
      .lean();
  }

  findOne(filter: FilterQuery<D> = {}) {
    return this.entityModel
      .findOne(filter, {
        ...this.defaultProjection,
      })
      .lean();
  }

  findOneAndUpdate(
    filter: FilterQuery<D> = {},
    data: Partial<D>,
    options: IEntityOptions = {},
  ) {
    return this.entityModel.findOneAndUpdate(filter, data, {
      new: true,
      projection: { ...this.defaultProjection },
      session: options.transaction?.session,
    });
  }

  async deleteOne(
    filter: FilterQuery<D> = {},
    options: IEntityOptions = {},
  ): Promise<boolean> {
    const result = await this.entityModel
      .deleteOne(filter)
      .session(options.transaction?.session)
      .lean();
    return result.deletedCount > 0;
  }

  async deleteMany(
    filter: FilterQuery<D> = {},
    options: IEntityOptions = {},
  ): Promise<boolean> {
    const result = await this.entityModel
      .deleteMany(filter)
      .session(options.transaction?.session)
      .lean();
    return result.deletedCount > 0;
  }
}
