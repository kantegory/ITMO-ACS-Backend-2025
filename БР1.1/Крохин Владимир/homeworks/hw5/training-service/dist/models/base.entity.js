'use strict';
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseEntity = void 0;
const typeorm_1 = require('typeorm');
/**
 * Базовая сущность с полями created_at и updated_at
 */
let BaseEntity = (() => {
  var _a;
  let _created_at_decorators;
  let _created_at_initializers = [];
  let _created_at_extraInitializers = [];
  let _updated_at_decorators;
  let _updated_at_initializers = [];
  let _updated_at_extraInitializers = [];
  return (
    (_a = class BaseEntity {
      constructor() {
        this.created_at = __runInitializers(
          this,
          _created_at_initializers,
          void 0,
        );
        this.updated_at =
          (__runInitializers(this, _created_at_extraInitializers),
          __runInitializers(this, _updated_at_initializers, void 0));
        __runInitializers(this, _updated_at_extraInitializers);
      }
    }),
    (() => {
      const _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _created_at_decorators = [
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
      ];
      _updated_at_decorators = [
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
      ];
      __esDecorate(
        null,
        null,
        _created_at_decorators,
        {
          kind: 'field',
          name: 'created_at',
          static: false,
          private: false,
          access: {
            has: obj => 'created_at' in obj,
            get: obj => obj.created_at,
            set: (obj, value) => {
              obj.created_at = value;
            },
          },
          metadata: _metadata,
        },
        _created_at_initializers,
        _created_at_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _updated_at_decorators,
        {
          kind: 'field',
          name: 'updated_at',
          static: false,
          private: false,
          access: {
            has: obj => 'updated_at' in obj,
            get: obj => obj.updated_at,
            set: (obj, value) => {
              obj.updated_at = value;
            },
          },
          metadata: _metadata,
        },
        _updated_at_initializers,
        _updated_at_extraInitializers,
      );
      if (_metadata)
        Object.defineProperty(_a, Symbol.metadata, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _metadata,
        });
    })(),
    _a
  );
})();
exports.BaseEntity = BaseEntity;
