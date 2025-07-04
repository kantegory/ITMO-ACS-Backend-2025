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
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === 'symbol')
      name = name.description ? '['.concat(name.description, ']') : '';
    return Object.defineProperty(f, 'name', {
      configurable: true,
      value: prefix ? ''.concat(prefix, ' ', name) : name,
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateNoteDto =
  exports.CreateNoteDto =
  exports.TrainingNoteDto =
  exports.UpdateTrainingNoteDto =
  exports.NoteDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * Базовая заметка
 */
let NoteDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _userId_decorators;
  let _userId_initializers = [];
  let _userId_extraInitializers = [];
  let _content_decorators;
  let _content_initializers = [];
  let _content_extraInitializers = [];
  let _createdAt_decorators;
  let _createdAt_initializers = [];
  let _createdAt_extraInitializers = [];
  let _editedAt_decorators;
  let _editedAt_initializers = [];
  let _editedAt_extraInitializers = [];
  var NoteDto = (_classThis = class {
    constructor() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.userId =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _userId_initializers, void 0));
      this.content =
        (__runInitializers(this, _userId_extraInitializers),
        __runInitializers(this, _content_initializers, void 0));
      this.createdAt =
        (__runInitializers(this, _content_extraInitializers),
        __runInitializers(this, _createdAt_initializers, void 0));
      this.editedAt =
        (__runInitializers(this, _createdAt_extraInitializers),
        __runInitializers(this, _editedAt_initializers, void 0));
      __runInitializers(this, _editedAt_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'NoteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [
      (0, class_validator_1.IsNumber)({}, { message: 'ID должен быть числом' }),
    ];
    _userId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID пользователя должен быть числом' },
      ),
    ];
    _content_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Содержимое должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Содержимое обязательно' }),
    ];
    _createdAt_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Дата создания должна быть строкой',
      }),
    ];
    _editedAt_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Дата редактирования должна быть строкой',
      }),
    ];
    __esDecorate(
      null,
      null,
      _id_decorators,
      {
        kind: 'field',
        name: 'id',
        static: false,
        private: false,
        access: {
          has: obj => 'id' in obj,
          get: obj => obj.id,
          set: (obj, value) => {
            obj.id = value;
          },
        },
        metadata: _metadata,
      },
      _id_initializers,
      _id_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _userId_decorators,
      {
        kind: 'field',
        name: 'userId',
        static: false,
        private: false,
        access: {
          has: obj => 'userId' in obj,
          get: obj => obj.userId,
          set: (obj, value) => {
            obj.userId = value;
          },
        },
        metadata: _metadata,
      },
      _userId_initializers,
      _userId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _content_decorators,
      {
        kind: 'field',
        name: 'content',
        static: false,
        private: false,
        access: {
          has: obj => 'content' in obj,
          get: obj => obj.content,
          set: (obj, value) => {
            obj.content = value;
          },
        },
        metadata: _metadata,
      },
      _content_initializers,
      _content_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _createdAt_decorators,
      {
        kind: 'field',
        name: 'createdAt',
        static: false,
        private: false,
        access: {
          has: obj => 'createdAt' in obj,
          get: obj => obj.createdAt,
          set: (obj, value) => {
            obj.createdAt = value;
          },
        },
        metadata: _metadata,
      },
      _createdAt_initializers,
      _createdAt_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _editedAt_decorators,
      {
        kind: 'field',
        name: 'editedAt',
        static: false,
        private: false,
        access: {
          has: obj => 'editedAt' in obj,
          get: obj => obj.editedAt,
          set: (obj, value) => {
            obj.editedAt = value;
          },
        },
        metadata: _metadata,
      },
      _editedAt_initializers,
      _editedAt_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    NoteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (NoteDto = _classThis);
})();
exports.NoteDto = NoteDto;
/**
 * DTO для обновления заметки тренировки
 */
let UpdateTrainingNoteDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _content_decorators;
  let _content_initializers = [];
  let _content_extraInitializers = [];
  var UpdateTrainingNoteDto = (_classThis = class {
    constructor() {
      this.content = __runInitializers(this, _content_initializers, void 0);
      __runInitializers(this, _content_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateTrainingNoteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _content_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Содержание должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Содержание обязательно' }),
    ];
    __esDecorate(
      null,
      null,
      _content_decorators,
      {
        kind: 'field',
        name: 'content',
        static: false,
        private: false,
        access: {
          has: obj => 'content' in obj,
          get: obj => obj.content,
          set: (obj, value) => {
            obj.content = value;
          },
        },
        metadata: _metadata,
      },
      _content_initializers,
      _content_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateTrainingNoteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateTrainingNoteDto = _classThis);
})();
exports.UpdateTrainingNoteDto = UpdateTrainingNoteDto;
/**
 * DTO для ответа с данными заметки тренировки
 */
let TrainingNoteDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var TrainingNoteDto = (_classThis = class {});
  __setFunctionName(_classThis, 'TrainingNoteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    TrainingNoteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (TrainingNoteDto = _classThis);
})();
exports.TrainingNoteDto = TrainingNoteDto;
/**
 * DTO для создания обычной заметки
 */
let CreateNoteDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _userId_decorators;
  let _userId_initializers = [];
  let _userId_extraInitializers = [];
  let _content_decorators;
  let _content_initializers = [];
  let _content_extraInitializers = [];
  var CreateNoteDto = (_classThis = class {
    constructor() {
      this.userId = __runInitializers(this, _userId_initializers, void 0);
      this.content =
        (__runInitializers(this, _userId_extraInitializers),
        __runInitializers(this, _content_initializers, void 0));
      __runInitializers(this, _content_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateNoteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _userId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID пользователя должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'ID пользователя обязателен',
      }),
    ];
    _content_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Содержимое должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Содержимое обязательно' }),
    ];
    __esDecorate(
      null,
      null,
      _userId_decorators,
      {
        kind: 'field',
        name: 'userId',
        static: false,
        private: false,
        access: {
          has: obj => 'userId' in obj,
          get: obj => obj.userId,
          set: (obj, value) => {
            obj.userId = value;
          },
        },
        metadata: _metadata,
      },
      _userId_initializers,
      _userId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _content_decorators,
      {
        kind: 'field',
        name: 'content',
        static: false,
        private: false,
        access: {
          has: obj => 'content' in obj,
          get: obj => obj.content,
          set: (obj, value) => {
            obj.content = value;
          },
        },
        metadata: _metadata,
      },
      _content_initializers,
      _content_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateNoteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateNoteDto = _classThis);
})();
exports.CreateNoteDto = CreateNoteDto;
/**
 * DTO для обновления обычной заметки
 */
let UpdateNoteDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _content_decorators;
  let _content_initializers = [];
  let _content_extraInitializers = [];
  var UpdateNoteDto = (_classThis = class {
    constructor() {
      this.content = __runInitializers(this, _content_initializers, void 0);
      __runInitializers(this, _content_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateNoteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _content_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Содержимое должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Содержимое обязательно' }),
    ];
    __esDecorate(
      null,
      null,
      _content_decorators,
      {
        kind: 'field',
        name: 'content',
        static: false,
        private: false,
        access: {
          has: obj => 'content' in obj,
          get: obj => obj.content,
          set: (obj, value) => {
            obj.content = value;
          },
        },
        metadata: _metadata,
      },
      _content_initializers,
      _content_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateNoteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateNoteDto = _classThis);
})();
exports.UpdateNoteDto = UpdateNoteDto;
