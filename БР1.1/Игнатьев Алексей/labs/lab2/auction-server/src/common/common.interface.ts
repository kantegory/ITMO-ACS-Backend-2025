export interface ICommonControllerFactoryOpts<CommonEntity> {
  entity: { new (): CommonEntity };
}
