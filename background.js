const getTypeOf = (thing) => typeof thing;
const EMPTY_STRING = "";
const STRING = getTypeOf(EMPTY_STRING);
const BOOLEAN = getTypeOf(true);
const NUMBER = getTypeOf(0);
const FUNCTION = getTypeOf(getTypeOf);
const TYPE = "type";
const DEFAULT = "default";
const SUM = "sum";
const AVG = "avg";
const MIN = "min";
const MAX = "max";
const LISTENER = "Listener";
const ADD = "add";
const HAS = "Has";
const IDS = "Ids";
const TABLE = "Table";
const TABLES = TABLE + "s";
const TABLE_IDS = TABLE + IDS;
const ROW = "Row";
const ROW_COUNT = ROW + "Count";
const ROW_IDS = ROW + IDS;
const CELL = "Cell";
const CELL_IDS = CELL + IDS;
const VALUE = "Value";
const VALUES = VALUE + "s";
const VALUE_IDS = VALUE + IDS;
const id = (key) => EMPTY_STRING + key;
const strStartsWith = (str, prefix) => str.startsWith(prefix);
const strEndsWith = (str, suffix) => str.endsWith(suffix);
const GLOBAL = globalThis;
const math = Math;
const mathMax = math.max;
const mathMin = math.min;
const mathFloor = math.floor;
const isFiniteNumber = isFinite;
const isInstanceOf = (thing, cls) => thing instanceof cls;
const isUndefined = (thing) => thing == void 0;
const ifNotUndefined = (value, then, otherwise) => isUndefined(value) ? otherwise == null ? void 0 : otherwise() : then(value);
const isTypeStringOrBoolean = (type) => type == STRING || type == BOOLEAN;
const isString = (thing) => getTypeOf(thing) == STRING;
const isFunction = (thing) => getTypeOf(thing) == FUNCTION;
const isArray = (thing) => Array.isArray(thing);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);
const size = (arrayOrString) => arrayOrString.length;
const test = (regex, subject) => regex.test(subject);
const errorNew = (message) => {
  throw new Error(message);
};
const arrayHas = (array, value) => array.includes(value);
const arrayEvery = (array, cb) => array.every(cb);
const arrayIsEqual = (array1, array2) => size(array1) === size(array2) && arrayEvery(array1, (value1, index) => array2[index] === value1);
const arraySort = (array, sorter) => array.sort(sorter);
const arrayForEach = (array, cb) => array.forEach(cb);
const arrayMap = (array, cb) => array.map(cb);
const arraySum = (array) => arrayReduce(array, (i, j) => i + j, 0);
const arrayReduce = (array, cb, initial) => array.reduce(cb, initial);
const arrayClear = (array, to) => array.splice(0, to);
const arrayPush = (array, ...values) => array.push(...values);
const arrayShift = (array) => array.shift();
const object = Object;
const getPrototypeOf = (obj) => object.getPrototypeOf(obj);
const objEntries = object.entries;
const objFrozen = object.isFrozen;
const isObject = (obj) => !isUndefined(obj) && ifNotUndefined(
  getPrototypeOf(obj),
  (objPrototype) => objPrototype == object.prototype || isUndefined(getPrototypeOf(objPrototype)),
  /* istanbul ignore next */
  () => true
);
const objIds = object.keys;
const objFreeze = object.freeze;
const objNew = (entries = []) => object.fromEntries(entries);
const objHas = (obj, id2) => id2 in obj;
const objDel = (obj, id2) => {
  delete obj[id2];
  return obj;
};
const objForEach = (obj, cb) => arrayForEach(objEntries(obj), ([id2, value]) => cb(value, id2));
const objToArray = (obj, cb) => arrayMap(objEntries(obj), ([id2, value]) => cb(value, id2));
const objSize = (obj) => size(objIds(obj));
const objIsEmpty = (obj) => isObject(obj) && objSize(obj) == 0;
const objEnsure = (obj, id2, getDefaultValue) => {
  if (!objHas(obj, id2)) {
    obj[id2] = getDefaultValue();
  }
  return obj[id2];
};
const objValidate = (obj, validateChild, onInvalidObj, emptyIsValid = 0) => {
  if (isUndefined(obj) || !isObject(obj) || !emptyIsValid && objIsEmpty(obj) || objFrozen(obj)) {
    onInvalidObj == null ? void 0 : onInvalidObj();
    return false;
  }
  objToArray(obj, (child, id2) => {
    if (!validateChild(child, id2)) {
      objDel(obj, id2);
    }
  });
  return emptyIsValid ? true : !objIsEmpty(obj);
};
const collSizeN = (collSizer) => (coll) => arrayReduce(collValues(coll), (total, coll2) => total + collSizer(coll2), 0);
const collSize = (coll) => (coll == null ? void 0 : coll.size) ?? 0;
const collSize2 = collSizeN(collSize);
const collSize3 = collSizeN(collSize2);
const collSize4 = collSizeN(collSize3);
const collHas = (coll, keyOrValue) => (coll == null ? void 0 : coll.has(keyOrValue)) ?? false;
const collIsEmpty = (coll) => isUndefined(coll) || collSize(coll) == 0;
const collValues = (coll) => [...(coll == null ? void 0 : coll.values()) ?? []];
const collClear = (coll) => coll.clear();
const collForEach = (coll, cb) => coll == null ? void 0 : coll.forEach(cb);
const collDel = (coll, keyOrValue) => coll == null ? void 0 : coll.delete(keyOrValue);
const mapNew = (entries) => new Map(entries);
const mapKeys = (map) => [...(map == null ? void 0 : map.keys()) ?? []];
const mapGet = (map, key) => map == null ? void 0 : map.get(key);
const mapForEach = (map, cb) => collForEach(map, (value, key) => cb(key, value));
const mapMap = (coll, cb) => arrayMap([...(coll == null ? void 0 : coll.entries()) ?? []], ([key, value]) => cb(value, key));
const mapSet = (map, key, value) => isUndefined(value) ? (collDel(map, key), map) : map == null ? void 0 : map.set(key, value);
const mapEnsure = (map, key, getDefaultValue, hadExistingValue) => {
  if (!collHas(map, key)) {
    mapSet(map, key, getDefaultValue());
  } else {
    hadExistingValue == null ? void 0 : hadExistingValue(mapGet(map, key));
  }
  return mapGet(map, key);
};
const mapMatch = (map, obj, set, del = mapSet) => {
  objToArray(obj, (value, id2) => set(map, id2, value));
  mapForEach(map, (id2) => objHas(obj, id2) ? 0 : del(map, id2));
  return map;
};
const mapToObj = (map, valueMapper, excludeMapValue, excludeObjValue) => {
  const obj = {};
  collForEach(map, (mapValue, id2) => {
    if (!(excludeMapValue == null ? void 0 : excludeMapValue(mapValue, id2))) {
      const objValue = valueMapper ? valueMapper(mapValue, id2) : mapValue;
      (excludeObjValue == null ? void 0 : excludeObjValue(objValue)) ? 0 : obj[id2] = objValue;
    }
  });
  return obj;
};
const mapToObj2 = (map, valueMapper, excludeMapValue) => mapToObj(
  map,
  (childMap) => mapToObj(childMap, valueMapper, excludeMapValue),
  collIsEmpty,
  objIsEmpty
);
const mapToObj3 = (map, valueMapper, excludeMapValue) => mapToObj(
  map,
  (childMap) => mapToObj2(childMap, valueMapper, excludeMapValue),
  collIsEmpty,
  objIsEmpty
);
const mapClone = (map, mapValue) => {
  const map2 = mapNew();
  collForEach(map, (value, key) => map2.set(key, (mapValue == null ? void 0 : mapValue(value)) ?? value));
  return map2;
};
const mapClone2 = (map) => mapClone(map, mapClone);
const mapClone3 = (map) => mapClone(map, mapClone2);
const visitTree = (node, path, ensureLeaf, pruneLeaf, p = 0) => ifNotUndefined(
  (ensureLeaf ? mapEnsure : mapGet)(
    node,
    path[p],
    p > size(path) - 2 ? ensureLeaf : mapNew
  ),
  (nodeOrLeaf) => {
    if (p > size(path) - 2) {
      if (pruneLeaf == null ? void 0 : pruneLeaf(nodeOrLeaf)) {
        mapSet(node, path[p]);
      }
      return nodeOrLeaf;
    }
    const leaf = visitTree(nodeOrLeaf, path, ensureLeaf, pruneLeaf, p + 1);
    if (collIsEmpty(nodeOrLeaf)) {
      mapSet(node, path[p]);
    }
    return leaf;
  }
);
const getCellOrValueType = (cellOrValue) => {
  const type = getTypeOf(cellOrValue);
  return isTypeStringOrBoolean(type) || type == NUMBER && isFiniteNumber(cellOrValue) ? type : void 0;
};
const isCellOrValueOrNullOrUndefined = (cellOrValue) => isUndefined(cellOrValue) || !isUndefined(getCellOrValueType(cellOrValue));
const setOrDelCell = (store2, tableId, rowId, cellId, cell) => isUndefined(cell) ? store2.delCell(tableId, rowId, cellId, true) : store2.setCell(tableId, rowId, cellId, cell);
const setOrDelValue = (store2, valueId, value) => isUndefined(value) ? store2.delValue(valueId) : store2.setValue(valueId, value);
const setNew = (entryOrEntries) => new Set(
  isArray(entryOrEntries) || isUndefined(entryOrEntries) ? entryOrEntries : [entryOrEntries]
);
const setAdd = (set, value) => set == null ? void 0 : set.add(value);
const INTEGER = /^\d+$/;
const getPoolFunctions = () => {
  const pool = [];
  let nextId = 0;
  return [
    (reuse) => (reuse ? arrayShift(pool) : null) ?? EMPTY_STRING + nextId++,
    (id2) => {
      if (test(INTEGER, id2) && size(pool) < 1e3) {
        arrayPush(pool, id2);
      }
    }
  ];
};
const getWildcardedLeaves = (deepIdSet, path = [EMPTY_STRING]) => {
  const leaves = [];
  const deep = (node, p) => p == size(path) ? arrayPush(leaves, node) : path[p] === null ? collForEach(node, (node2) => deep(node2, p + 1)) : arrayForEach([path[p], null], (id2) => deep(mapGet(node, id2), p + 1));
  deep(deepIdSet, 0);
  return leaves;
};
const getListenerFunctions = (getThing) => {
  let thing;
  const [getId, releaseId] = getPoolFunctions();
  const allListeners = mapNew();
  const addListener = (listener, idSetNode, path, pathGetters = [], extraArgsGetter = () => []) => {
    thing ?? (thing = getThing());
    const id2 = getId(1);
    mapSet(allListeners, id2, [
      listener,
      idSetNode,
      path,
      pathGetters,
      extraArgsGetter
    ]);
    setAdd(visitTree(idSetNode, path ?? [EMPTY_STRING], setNew), id2);
    return id2;
  };
  const callListeners = (idSetNode, ids, ...extraArgs) => arrayForEach(
    getWildcardedLeaves(idSetNode, ids),
    (set) => collForEach(
      set,
      (id2) => mapGet(allListeners, id2)[0](thing, ...ids ?? [], ...extraArgs)
    )
  );
  const delListener = (id2) => ifNotUndefined(mapGet(allListeners, id2), ([, idSetNode, idOrNulls]) => {
    visitTree(idSetNode, idOrNulls ?? [EMPTY_STRING], void 0, (idSet) => {
      collDel(idSet, id2);
      return collIsEmpty(idSet) ? 1 : 0;
    });
    mapSet(allListeners, id2);
    releaseId(id2);
    return idOrNulls;
  });
  const callListener = (id2) => ifNotUndefined(
    mapGet(allListeners, id2),
    ([listener, , path = [], pathGetters, extraArgsGetter]) => {
      const callWithIds = (...ids) => {
        var _a;
        const index = size(ids);
        index == size(path) ? listener(thing, ...ids, ...extraArgsGetter(ids)) : isUndefined(path[index]) ? arrayForEach(
          ((_a = pathGetters[index]) == null ? void 0 : _a.call(pathGetters, ...ids)) ?? [],
          (id22) => callWithIds(...ids, id22)
        ) : callWithIds(...ids, path[index]);
      };
      callWithIds();
    }
  );
  return [addListener, callListeners, delListener, callListener];
};
const MASK6 = 63;
const ENCODE = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".split(
  EMPTY_STRING
);
const DECODE = mapNew(arrayMap(ENCODE, (char, index) => [char, index]));
const encode = (num) => ENCODE[num & MASK6];
const decode = (str, pos) => mapGet(DECODE, str[pos]) ?? 0;
const getRandomValues = GLOBAL.crypto ? (array) => GLOBAL.crypto.getRandomValues(array) : (
  /* istanbul ignore next */
  (array) => arrayMap(array, () => mathFloor(math.random() * 256))
);
const defaultSorter = (sortKey1, sortKey2) => (sortKey1 ?? 0) < (sortKey2 ?? 0) ? -1 : 1;
const getUniqueId = (length = 16) => arrayReduce(
  getRandomValues(new Uint8Array(length)),
  (uniqueId, number) => uniqueId + encode(number),
  ""
);
mapNew([
  [
    AVG,
    [
      (numbers, length) => arraySum(numbers) / length,
      (metric, add, length) => metric + (add - metric) / (length + 1),
      (metric, remove, length) => metric + (metric - remove) / (length - 1),
      (metric, add, remove, length) => metric + (add - remove) / length
    ]
  ],
  [
    MAX,
    [
      (numbers) => mathMax(...numbers),
      (metric, add) => mathMax(add, metric),
      (metric, remove) => remove == metric ? void 0 : metric,
      (metric, add, remove) => remove == metric ? void 0 : mathMax(add, metric)
    ]
  ],
  [
    MIN,
    [
      (numbers) => mathMin(...numbers),
      (metric, add) => mathMin(add, metric),
      (metric, remove) => remove == metric ? void 0 : metric,
      (metric, add, remove) => remove == metric ? void 0 : mathMin(add, metric)
    ]
  ],
  [
    SUM,
    [
      (numbers) => arraySum(numbers),
      (metric, add) => metric + add,
      (metric, remove) => metric - remove,
      (metric, add, remove) => metric - remove + add
    ]
  ]
]);
const scheduleRunning = mapNew();
const scheduleActions = mapNew();
const getStoreFunctions = (persist = 1, store2) => persist != 1 && store2.isMergeable() ? [
  1,
  store2.getMergeableContent,
  store2.getTransactionMergeableChanges,
  ([[changedTables], [changedValues]]) => !objIsEmpty(changedTables) || !objIsEmpty(changedValues),
  store2.setDefaultContent
] : persist != 2 ? [
  0,
  store2.getContent,
  store2.getTransactionChanges,
  ([changedTables, changedValues]) => !objIsEmpty(changedTables) || !objIsEmpty(changedValues),
  store2.setContent
] : errorNew("Store type not supported by this Persister");
const createCustomPersister = (store2, getPersisted, setPersisted, addPersisterListener, delPersisterListener, onIgnoredError, persist, extra = {}, scheduleId = []) => {
  let loadSave = 0;
  let loads = 0;
  let saves = 0;
  let action;
  let autoLoadHandle;
  let autoSaveListenerId;
  mapEnsure(scheduleRunning, scheduleId, () => 0);
  mapEnsure(scheduleActions, scheduleId, () => []);
  const [
    isMergeableStore,
    getContent,
    getChanges,
    hasChanges,
    setDefaultContent
  ] = getStoreFunctions(persist, store2);
  const run = async () => {
    if (!mapGet(scheduleRunning, scheduleId)) {
      mapSet(scheduleRunning, scheduleId, 1);
      while (!isUndefined(action = arrayShift(mapGet(scheduleActions, scheduleId)))) {
        try {
          await action();
        } catch (error) {
        }
      }
      mapSet(scheduleRunning, scheduleId, 0);
    }
  };
  const setContentOrChanges = (contentOrChanges) => {
    (isMergeableStore && isArray(contentOrChanges == null ? void 0 : contentOrChanges[0]) ? (contentOrChanges == null ? void 0 : contentOrChanges[2]) === 1 ? store2.applyMergeableChanges : store2.setMergeableContent : (contentOrChanges == null ? void 0 : contentOrChanges[2]) === 1 ? store2.applyChanges : store2.setContent)(contentOrChanges);
  };
  const load = async (initialContent) => {
    if (loadSave != 2) {
      loadSave = 1;
      loads++;
      await schedule(async () => {
        try {
          const content = await getPersisted();
          isArray(content) ? setContentOrChanges(content) : errorNew(`Content is not an array ${content}`);
        } catch (error) {
          if (initialContent) {
            setDefaultContent(initialContent);
          }
        }
        loadSave = 0;
      });
    }
    return persister2;
  };
  const startAutoLoad = async (initialContent) => {
    await stopAutoLoad().load(initialContent);
    try {
      autoLoadHandle = addPersisterListener(async (content, changes) => {
        if (changes || content) {
          if (loadSave != 2) {
            loadSave = 1;
            loads++;
            setContentOrChanges(changes ?? content);
            loadSave = 0;
          }
        } else {
          await load();
        }
      });
    } catch (error) {
    }
    return persister2;
  };
  const stopAutoLoad = () => {
    if (autoLoadHandle) {
      delPersisterListener(autoLoadHandle);
      autoLoadHandle = void 0;
    }
    return persister2;
  };
  const isAutoLoading = () => !isUndefined(autoLoadHandle);
  const save = async (changes) => {
    if (loadSave != 1) {
      loadSave = 2;
      saves++;
      await schedule(async () => {
        try {
          await setPersisted(getContent, changes);
        } catch (error) {
        }
        loadSave = 0;
      });
    }
    return persister2;
  };
  const startAutoSave = async () => {
    await stopAutoSave().save();
    autoSaveListenerId = store2.addDidFinishTransactionListener(() => {
      const changes = getChanges();
      if (hasChanges(changes)) {
        save(changes);
      }
    });
    return persister2;
  };
  const stopAutoSave = () => {
    ifNotUndefined(autoSaveListenerId, store2.delListener);
    autoSaveListenerId = void 0;
    return persister2;
  };
  const isAutoSaving = () => !isUndefined(autoSaveListenerId);
  const schedule = async (...actions) => {
    arrayPush(mapGet(scheduleActions, scheduleId), ...actions);
    await run();
    return persister2;
  };
  const getStore = () => store2;
  const destroy = () => {
    arrayClear(mapGet(scheduleActions, scheduleId));
    return stopAutoLoad().stopAutoSave();
  };
  const getStats = () => ({ loads, saves });
  const persister2 = {
    load,
    startAutoLoad,
    stopAutoLoad,
    isAutoLoading,
    save,
    startAutoSave,
    stopAutoSave,
    isAutoSaving,
    schedule,
    getStore,
    destroy,
    getStats,
    ...extra
  };
  return objFreeze(persister2);
};
const textEncoder = new GLOBAL.TextEncoder();
const getHash = (value) => {
  let hash = 2166136261;
  arrayForEach(textEncoder.encode(value), (char) => {
    hash ^= char;
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  });
  return hash >>> 0;
};
const stampCloneWithHash = ([value, time, hash]) => [value, time, hash];
const stampCloneWithoutHash = ([value, time]) => newStamp(value, time);
const newStamp = (value, time) => time ? [value, time] : [value];
const getStampHash = (stamp) => stamp[2];
const hashIdAndHash = (id2, hash) => getHash(id2 + ":" + hash);
const replaceTimeHash = (oldTime, newTime) => newTime > oldTime ? (oldTime ? getHash(oldTime) : 0) ^ getHash(newTime) : 0;
const getLatestTime = (time1, time2) => ((time1 ?? "") > (time2 ?? "") ? time1 : time2) ?? "";
const stampUpdate = (stamp, hash, time) => {
  stamp[2] = hash >>> 0;
  if (time > stamp[1]) {
    stamp[1] = time;
  }
};
const stampNewObj = (time = EMPTY_STRING) => newStamp(objNew(), time);
const stampNewMap = (time = EMPTY_STRING) => [mapNew(), time, 0];
const stampMapToObjWithHash = ([map, time, hash], mapper = stampCloneWithHash) => [mapToObj(map, mapper), time, hash];
const stampMapToObjWithoutHash = ([map, time], mapper = stampCloneWithoutHash) => newStamp(mapToObj(map, mapper), time);
const stampValidate = (stamp, validateThing) => isArray(stamp) && size(stamp) == 3 && isString(stamp[1]) && getTypeOf(stamp[2]) == NUMBER && isFiniteNumber(stamp[2]) && validateThing(stamp[0]);
const pairNew = (value) => [value, value];
const pairCollSize2 = (pair, func = collSize2) => func(pair[0]) + func(pair[1]);
const pairNewMap = () => [mapNew(), mapNew()];
const pairClone = (array) => [...array];
const pairIsEqual = ([entry1, entry2]) => entry1 === entry2;
const jsonStringWithMap = (obj) => JSON.stringify(
  obj,
  (_key, value) => isInstanceOf(value, Map) ? object.fromEntries([...value]) : value
);
const jsonParse = JSON.parse;
const idsChanged = (changedIds, id2, addedOrRemoved) => mapSet(
  changedIds,
  id2,
  mapGet(changedIds, id2) == -addedOrRemoved ? void 0 : addedOrRemoved
);
const createStore = () => {
  let hasTablesSchema;
  let hasValuesSchema;
  let hadTables = false;
  let hadValues = false;
  let transactions = 0;
  let internalListeners = [];
  const changedTableIds = mapNew();
  const changedTableCellIds = mapNew();
  const changedRowCount = mapNew();
  const changedRowIds = mapNew();
  const changedCellIds = mapNew();
  const changedCells = mapNew();
  const changedValueIds = mapNew();
  const changedValues = mapNew();
  const invalidCells = mapNew();
  const invalidValues = mapNew();
  const tablesSchemaMap = mapNew();
  const tablesSchemaRowCache = mapNew();
  const valuesSchemaMap = mapNew();
  const valuesDefaulted = mapNew();
  const valuesNonDefaulted = setNew();
  const tablePoolFunctions = mapNew();
  const tableCellIds = mapNew();
  const tablesMap = mapNew();
  const valuesMap = mapNew();
  const hasTablesListeners = pairNewMap();
  const tablesListeners = pairNewMap();
  const tableIdsListeners = pairNewMap();
  const hasTableListeners = pairNewMap();
  const tableListeners = pairNewMap();
  const tableCellIdsListeners = pairNewMap();
  const hasTableCellListeners = pairNewMap();
  const rowCountListeners = pairNewMap();
  const rowIdsListeners = pairNewMap();
  const sortedRowIdsListeners = pairNewMap();
  const hasRowListeners = pairNewMap();
  const rowListeners = pairNewMap();
  const cellIdsListeners = pairNewMap();
  const hasCellListeners = pairNewMap();
  const cellListeners = pairNewMap();
  const invalidCellListeners = pairNewMap();
  const invalidValueListeners = pairNewMap();
  const hasValuesListeners = pairNewMap();
  const valuesListeners = pairNewMap();
  const valueIdsListeners = pairNewMap();
  const hasValueListeners = pairNewMap();
  const valueListeners = pairNewMap();
  const startTransactionListeners = mapNew();
  const finishTransactionListeners = pairNewMap();
  const [addListener, callListeners, delListenerImpl, callListenerImpl] = getListenerFunctions(() => store2);
  const validateTablesSchema = (tableSchema) => objValidate(
    tableSchema,
    (tableSchema2) => objValidate(tableSchema2, validateCellOrValueSchema)
  );
  const validateValuesSchema = (valuesSchema) => objValidate(valuesSchema, validateCellOrValueSchema);
  const validateCellOrValueSchema = (schema) => {
    if (!objValidate(schema, (_child, id2) => arrayHas([TYPE, DEFAULT], id2))) {
      return false;
    }
    const type = schema[TYPE];
    if (!isTypeStringOrBoolean(type) && type != NUMBER) {
      return false;
    }
    if (getCellOrValueType(schema[DEFAULT]) != type) {
      objDel(schema, DEFAULT);
    }
    return true;
  };
  const validateContent = isArray;
  const validateTables = (tables) => objValidate(tables, validateTable, cellInvalid);
  const validateTable = (table, tableId) => (!hasTablesSchema || collHas(tablesSchemaMap, tableId) || /* istanbul ignore next */
  cellInvalid(tableId)) && objValidate(
    table,
    (row, rowId) => validateRow(tableId, rowId, row),
    () => cellInvalid(tableId)
  );
  const validateRow = (tableId, rowId, row, skipDefaults) => objValidate(
    skipDefaults ? row : addDefaultsToRow(row, tableId, rowId),
    (cell, cellId) => ifNotUndefined(
      getValidatedCell(tableId, rowId, cellId, cell),
      (validCell) => {
        row[cellId] = validCell;
        return true;
      },
      () => false
    ),
    () => cellInvalid(tableId, rowId)
  );
  const getValidatedCell = (tableId, rowId, cellId, cell) => hasTablesSchema ? ifNotUndefined(
    mapGet(mapGet(tablesSchemaMap, tableId), cellId),
    (cellSchema) => getCellOrValueType(cell) != cellSchema[TYPE] ? cellInvalid(tableId, rowId, cellId, cell, cellSchema[DEFAULT]) : cell,
    () => cellInvalid(tableId, rowId, cellId, cell)
  ) : isUndefined(getCellOrValueType(cell)) ? cellInvalid(tableId, rowId, cellId, cell) : cell;
  const validateValues = (values, skipDefaults) => objValidate(
    skipDefaults ? values : addDefaultsToValues(values),
    (value, valueId) => ifNotUndefined(
      getValidatedValue(valueId, value),
      (validValue) => {
        values[valueId] = validValue;
        return true;
      },
      () => false
    ),
    () => valueInvalid()
  );
  const getValidatedValue = (valueId, value) => hasValuesSchema ? ifNotUndefined(
    mapGet(valuesSchemaMap, valueId),
    (valueSchema) => getCellOrValueType(value) != valueSchema[TYPE] ? valueInvalid(valueId, value, valueSchema[DEFAULT]) : value,
    () => valueInvalid(valueId, value)
  ) : isUndefined(getCellOrValueType(value)) ? valueInvalid(valueId, value) : value;
  const addDefaultsToRow = (row, tableId, rowId) => {
    ifNotUndefined(
      mapGet(tablesSchemaRowCache, tableId),
      ([rowDefaulted, rowNonDefaulted]) => {
        collForEach(rowDefaulted, (cell, cellId) => {
          if (!objHas(row, cellId)) {
            row[cellId] = cell;
          }
        });
        collForEach(rowNonDefaulted, (cellId) => {
          if (!objHas(row, cellId)) {
            cellInvalid(tableId, rowId, cellId);
          }
        });
      }
    );
    return row;
  };
  const addDefaultsToValues = (values) => {
    if (hasValuesSchema) {
      collForEach(valuesDefaulted, (value, valueId) => {
        if (!objHas(values, valueId)) {
          values[valueId] = value;
        }
      });
      collForEach(valuesNonDefaulted, (valueId) => {
        if (!objHas(values, valueId)) {
          valueInvalid(valueId);
        }
      });
    }
    return values;
  };
  const setValidTablesSchema = (tablesSchema) => mapMatch(
    tablesSchemaMap,
    tablesSchema,
    (_tablesSchema, tableId, tableSchema) => {
      const rowDefaulted = mapNew();
      const rowNonDefaulted = setNew();
      mapMatch(
        mapEnsure(tablesSchemaMap, tableId, mapNew),
        tableSchema,
        (tableSchemaMap, cellId, cellSchema) => {
          mapSet(tableSchemaMap, cellId, cellSchema);
          ifNotUndefined(
            cellSchema[DEFAULT],
            (def) => mapSet(rowDefaulted, cellId, def),
            () => setAdd(rowNonDefaulted, cellId)
          );
        }
      );
      mapSet(tablesSchemaRowCache, tableId, [rowDefaulted, rowNonDefaulted]);
    },
    (_tablesSchema, tableId) => {
      mapSet(tablesSchemaMap, tableId);
      mapSet(tablesSchemaRowCache, tableId);
    }
  );
  const setValidValuesSchema = (valuesSchema) => mapMatch(
    valuesSchemaMap,
    valuesSchema,
    (_valuesSchema, valueId, valueSchema) => {
      mapSet(valuesSchemaMap, valueId, valueSchema);
      ifNotUndefined(
        valueSchema[DEFAULT],
        (def) => mapSet(valuesDefaulted, valueId, def),
        () => setAdd(valuesNonDefaulted, valueId)
      );
    },
    (_valuesSchema, valueId) => {
      mapSet(valuesSchemaMap, valueId);
      mapSet(valuesDefaulted, valueId);
      collDel(valuesNonDefaulted, valueId);
    }
  );
  const setOrDelTables = (tables) => objIsEmpty(tables) ? delTables() : setTables(tables);
  const setValidContent = ([tables, values]) => {
    (objIsEmpty(tables) ? delTables : setTables)(tables);
    (objIsEmpty(values) ? delValues : setValues)(values);
  };
  const setValidTables = (tables) => mapMatch(
    tablesMap,
    tables,
    (_tables, tableId, table) => setValidTable(tableId, table),
    (_tables, tableId) => delValidTable(tableId)
  );
  const setValidTable = (tableId, table) => mapMatch(
    mapEnsure(tablesMap, tableId, () => {
      tableIdsChanged(tableId, 1);
      mapSet(tablePoolFunctions, tableId, getPoolFunctions());
      mapSet(tableCellIds, tableId, mapNew());
      return mapNew();
    }),
    table,
    (tableMap, rowId, row) => setValidRow(tableId, tableMap, rowId, row),
    (tableMap, rowId) => delValidRow(tableId, tableMap, rowId)
  );
  const setValidRow = (tableId, tableMap, rowId, row, forceDel) => mapMatch(
    mapEnsure(tableMap, rowId, () => {
      rowIdsChanged(tableId, rowId, 1);
      return mapNew();
    }),
    row,
    (rowMap, cellId, cell) => setValidCell(tableId, rowId, rowMap, cellId, cell),
    (rowMap, cellId) => delValidCell(tableId, tableMap, rowId, rowMap, cellId, forceDel)
  );
  const setValidCell = (tableId, rowId, rowMap, cellId, cell) => {
    if (!collHas(rowMap, cellId)) {
      cellIdsChanged(tableId, rowId, cellId, 1);
    }
    const oldCell = mapGet(rowMap, cellId);
    if (cell !== oldCell) {
      cellChanged(tableId, rowId, cellId, oldCell, cell);
      mapSet(rowMap, cellId, cell);
    }
  };
  const setCellIntoDefaultRow = (tableId, tableMap, rowId, cellId, validCell) => ifNotUndefined(
    mapGet(tableMap, rowId),
    (rowMap) => setValidCell(tableId, rowId, rowMap, cellId, validCell),
    () => setValidRow(
      tableId,
      tableMap,
      rowId,
      addDefaultsToRow({ [cellId]: validCell }, tableId, rowId)
    )
  );
  const setOrDelValues = (values) => objIsEmpty(values) ? delValues() : setValues(values);
  const setValidValues = (values) => mapMatch(
    valuesMap,
    values,
    (_valuesMap, valueId, value) => setValidValue(valueId, value),
    (_valuesMap, valueId) => delValidValue(valueId)
  );
  const setValidValue = (valueId, value) => {
    if (!collHas(valuesMap, valueId)) {
      valueIdsChanged(valueId, 1);
    }
    const oldValue = mapGet(valuesMap, valueId);
    if (value !== oldValue) {
      valueChanged(valueId, oldValue, value);
      mapSet(valuesMap, valueId, value);
    }
  };
  const getNewRowId = (tableId, reuse) => {
    const [getId] = mapGet(tablePoolFunctions, tableId);
    const rowId = getId(reuse);
    if (!collHas(mapGet(tablesMap, tableId), rowId)) {
      return rowId;
    }
    return getNewRowId(tableId, reuse);
  };
  const getOrCreateTable = (tableId) => mapGet(tablesMap, tableId) ?? setValidTable(tableId, {});
  const delValidTable = (tableId) => setValidTable(tableId, {});
  const delValidRow = (tableId, tableMap, rowId) => {
    const [, releaseId] = mapGet(tablePoolFunctions, tableId);
    releaseId(rowId);
    setValidRow(tableId, tableMap, rowId, {}, true);
  };
  const delValidCell = (tableId, table, rowId, row, cellId, forceDel) => {
    var _a;
    const defaultCell = mapGet(
      (_a = mapGet(tablesSchemaRowCache, tableId)) == null ? void 0 : _a[0],
      cellId
    );
    if (!isUndefined(defaultCell) && !forceDel) {
      return setValidCell(tableId, rowId, row, cellId, defaultCell);
    }
    const delCell2 = (cellId2) => {
      cellChanged(tableId, rowId, cellId2, mapGet(row, cellId2));
      cellIdsChanged(tableId, rowId, cellId2, -1);
      mapSet(row, cellId2);
    };
    isUndefined(defaultCell) ? delCell2(cellId) : mapForEach(row, delCell2);
    if (collIsEmpty(row)) {
      rowIdsChanged(tableId, rowId, -1);
      if (collIsEmpty(mapSet(table, rowId))) {
        tableIdsChanged(tableId, -1);
        mapSet(tablesMap, tableId);
        mapSet(tablePoolFunctions, tableId);
        mapSet(tableCellIds, tableId);
      }
    }
  };
  const delValidValue = (valueId) => {
    const defaultValue = mapGet(valuesDefaulted, valueId);
    if (!isUndefined(defaultValue)) {
      return setValidValue(valueId, defaultValue);
    }
    valueChanged(valueId, mapGet(valuesMap, valueId));
    valueIdsChanged(valueId, -1);
    mapSet(valuesMap, valueId);
  };
  const tableIdsChanged = (tableId, addedOrRemoved) => idsChanged(changedTableIds, tableId, addedOrRemoved);
  const rowIdsChanged = (tableId, rowId, addedOrRemoved) => idsChanged(
    mapEnsure(changedRowIds, tableId, mapNew),
    rowId,
    addedOrRemoved
  ) && mapSet(
    changedRowCount,
    tableId,
    mapEnsure(changedRowCount, tableId, () => 0) + addedOrRemoved
  );
  const cellIdsChanged = (tableId, rowId, cellId, addedOrRemoved) => {
    const cellIds = mapGet(tableCellIds, tableId);
    const count = mapGet(cellIds, cellId) ?? 0;
    if (count == 0 && addedOrRemoved == 1 || count == 1 && addedOrRemoved == -1) {
      idsChanged(
        mapEnsure(changedTableCellIds, tableId, mapNew),
        cellId,
        addedOrRemoved
      );
    }
    mapSet(
      cellIds,
      cellId,
      count != -addedOrRemoved ? count + addedOrRemoved : null
    );
    idsChanged(
      mapEnsure(mapEnsure(changedCellIds, tableId, mapNew), rowId, mapNew),
      cellId,
      addedOrRemoved
    );
  };
  const cellChanged = (tableId, rowId, cellId, oldCell, newCell) => {
    var _a;
    mapEnsure(
      mapEnsure(mapEnsure(changedCells, tableId, mapNew), rowId, mapNew),
      cellId,
      () => [oldCell, 0]
    )[1] = newCell;
    (_a = internalListeners[3]) == null ? void 0 : _a.call(internalListeners, tableId, rowId, cellId, newCell);
  };
  const valueIdsChanged = (valueId, addedOrRemoved) => idsChanged(changedValueIds, valueId, addedOrRemoved);
  const valueChanged = (valueId, oldValue, newValue) => {
    var _a;
    mapEnsure(changedValues, valueId, () => [oldValue, 0])[1] = newValue;
    (_a = internalListeners[4]) == null ? void 0 : _a.call(internalListeners, valueId, newValue);
  };
  const cellInvalid = (tableId, rowId, cellId, invalidCell, defaultedCell) => {
    arrayPush(
      mapEnsure(
        mapEnsure(mapEnsure(invalidCells, tableId, mapNew), rowId, mapNew),
        cellId,
        () => []
      ),
      invalidCell
    );
    return defaultedCell;
  };
  const valueInvalid = (valueId, invalidValue, defaultedValue) => {
    arrayPush(
      mapEnsure(invalidValues, valueId, () => []),
      invalidValue
    );
    return defaultedValue;
  };
  const getCellChange = (tableId, rowId, cellId) => ifNotUndefined(
    mapGet(mapGet(mapGet(changedCells, tableId), rowId), cellId),
    ([oldCell, newCell]) => [true, oldCell, newCell],
    () => [false, ...pairNew(getCell(tableId, rowId, cellId))]
  );
  const getValueChange = (valueId) => ifNotUndefined(
    mapGet(changedValues, valueId),
    ([oldValue, newValue]) => [true, oldValue, newValue],
    () => [false, ...pairNew(getValue(valueId))]
  );
  const callInvalidCellListeners = (mutator) => !collIsEmpty(invalidCells) && !collIsEmpty(invalidCellListeners[mutator]) ? collForEach(
    mutator ? mapClone3(invalidCells) : invalidCells,
    (rows, tableId) => collForEach(
      rows,
      (cells, rowId) => collForEach(
        cells,
        (invalidCell, cellId) => callListeners(
          invalidCellListeners[mutator],
          [tableId, rowId, cellId],
          invalidCell
        )
      )
    )
  ) : 0;
  const callInvalidValueListeners = (mutator) => !collIsEmpty(invalidValues) && !collIsEmpty(invalidValueListeners[mutator]) ? collForEach(
    mutator ? mapClone(invalidValues) : invalidValues,
    (invalidValue, valueId) => callListeners(
      invalidValueListeners[mutator],
      [valueId],
      invalidValue
    )
  ) : 0;
  const callIdsAndHasListenersIfChanged = (changedIds, idListeners, hasListeners, ids) => {
    if (!collIsEmpty(changedIds)) {
      callListeners(idListeners, ids, () => mapToObj(changedIds));
      mapForEach(
        changedIds,
        (changedId, changed) => callListeners(hasListeners, [...ids ?? [], changedId], changed == 1)
      );
      return 1;
    }
  };
  const callTabularListenersForChanges = (mutator) => {
    const hasTablesNow = hasTables();
    if (hasTablesNow != hadTables) {
      callListeners(hasTablesListeners[mutator], void 0, hasTablesNow);
    }
    const emptySortedRowIdListeners = collIsEmpty(
      sortedRowIdsListeners[mutator]
    );
    const emptyIdAndHasListeners = collIsEmpty(cellIdsListeners[mutator]) && collIsEmpty(hasCellListeners[mutator]) && collIsEmpty(rowIdsListeners[mutator]) && collIsEmpty(hasRowListeners[mutator]) && collIsEmpty(tableCellIdsListeners[mutator]) && collIsEmpty(hasTableCellListeners[mutator]) && collIsEmpty(rowCountListeners[mutator]) && emptySortedRowIdListeners && collIsEmpty(tableIdsListeners[mutator]) && collIsEmpty(hasTableListeners[mutator]);
    const emptyOtherListeners = collIsEmpty(cellListeners[mutator]) && collIsEmpty(rowListeners[mutator]) && collIsEmpty(tableListeners[mutator]) && collIsEmpty(tablesListeners[mutator]);
    if (!emptyIdAndHasListeners || !emptyOtherListeners) {
      const changes = mutator ? [
        mapClone(changedTableIds),
        mapClone2(changedTableCellIds),
        mapClone(changedRowCount),
        mapClone2(changedRowIds),
        mapClone3(changedCellIds),
        mapClone3(changedCells)
      ] : [
        changedTableIds,
        changedTableCellIds,
        changedRowCount,
        changedRowIds,
        changedCellIds,
        changedCells
      ];
      if (!emptyIdAndHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          tableIdsListeners[mutator],
          hasTableListeners[mutator]
        );
        collForEach(
          changes[1],
          (changedIds, tableId) => callIdsAndHasListenersIfChanged(
            changedIds,
            tableCellIdsListeners[mutator],
            hasTableCellListeners[mutator],
            [tableId]
          )
        );
        collForEach(changes[2], (changedCount, tableId) => {
          if (changedCount != 0) {
            callListeners(
              rowCountListeners[mutator],
              [tableId],
              getRowCount(tableId)
            );
          }
        });
        const calledSortableTableIds = setNew();
        collForEach(changes[3], (changedIds, tableId) => {
          if (callIdsAndHasListenersIfChanged(
            changedIds,
            rowIdsListeners[mutator],
            hasRowListeners[mutator],
            [tableId]
          ) && !emptySortedRowIdListeners) {
            callListeners(sortedRowIdsListeners[mutator], [tableId, null]);
            setAdd(calledSortableTableIds, tableId);
          }
        });
        if (!emptySortedRowIdListeners) {
          collForEach(changes[5], (rows, tableId) => {
            if (!collHas(calledSortableTableIds, tableId)) {
              const sortableCellIds = setNew();
              collForEach(
                rows,
                (cells) => collForEach(
                  cells,
                  ([oldCell, newCell], cellId) => newCell !== oldCell ? setAdd(sortableCellIds, cellId) : collDel(cells, cellId)
                )
              );
              collForEach(
                sortableCellIds,
                (cellId) => callListeners(sortedRowIdsListeners[mutator], [
                  tableId,
                  cellId
                ])
              );
            }
          });
        }
        collForEach(
          changes[4],
          (rowCellIds, tableId) => collForEach(
            rowCellIds,
            (changedIds, rowId) => callIdsAndHasListenersIfChanged(
              changedIds,
              cellIdsListeners[mutator],
              hasCellListeners[mutator],
              [tableId, rowId]
            )
          )
        );
      }
      if (!emptyOtherListeners) {
        let tablesChanged;
        collForEach(changes[5], (rows, tableId) => {
          let tableChanged;
          collForEach(rows, (cells, rowId) => {
            let rowChanged;
            collForEach(cells, ([oldCell, newCell], cellId) => {
              if (newCell !== oldCell) {
                callListeners(
                  cellListeners[mutator],
                  [tableId, rowId, cellId],
                  newCell,
                  oldCell,
                  getCellChange
                );
                tablesChanged = tableChanged = rowChanged = 1;
              }
            });
            if (rowChanged) {
              callListeners(
                rowListeners[mutator],
                [tableId, rowId],
                getCellChange
              );
            }
          });
          if (tableChanged) {
            callListeners(tableListeners[mutator], [tableId], getCellChange);
          }
        });
        if (tablesChanged) {
          callListeners(tablesListeners[mutator], void 0, getCellChange);
        }
      }
    }
  };
  const callValuesListenersForChanges = (mutator) => {
    const hasValuesNow = hasValues();
    if (hasValuesNow != hadValues) {
      callListeners(hasValuesListeners[mutator], void 0, hasValuesNow);
    }
    const emptyIdAndHasListeners = collIsEmpty(valueIdsListeners[mutator]) && collIsEmpty(hasValueListeners[mutator]);
    const emptyOtherListeners = collIsEmpty(valueListeners[mutator]) && collIsEmpty(valuesListeners[mutator]);
    if (!emptyIdAndHasListeners || !emptyOtherListeners) {
      const changes = mutator ? [mapClone(changedValueIds), mapClone(changedValues)] : [changedValueIds, changedValues];
      if (!emptyIdAndHasListeners) {
        callIdsAndHasListenersIfChanged(
          changes[0],
          valueIdsListeners[mutator],
          hasValueListeners[mutator]
        );
      }
      if (!emptyOtherListeners) {
        let valuesChanged;
        collForEach(changes[1], ([oldValue, newValue], valueId) => {
          if (newValue !== oldValue) {
            callListeners(
              valueListeners[mutator],
              [valueId],
              newValue,
              oldValue,
              getValueChange
            );
            valuesChanged = 1;
          }
        });
        if (valuesChanged) {
          callListeners(valuesListeners[mutator], void 0, getValueChange);
        }
      }
    }
  };
  const fluentTransaction = (actions, ...args) => {
    transaction(() => actions(...arrayMap(args, id)));
    return store2;
  };
  const getContent = () => [getTables(), getValues()];
  const getTables = () => mapToObj3(tablesMap);
  const getTableIds = () => mapKeys(tablesMap);
  const getTable = (tableId) => mapToObj2(mapGet(tablesMap, id(tableId)));
  const getTableCellIds = (tableId) => mapKeys(mapGet(tableCellIds, id(tableId)));
  const getRowCount = (tableId) => collSize(mapGet(tablesMap, id(tableId)));
  const getRowIds = (tableId) => mapKeys(mapGet(tablesMap, id(tableId)));
  const getSortedRowIds = (tableId, cellId, descending, offset = 0, limit) => arrayMap(
    slice(
      arraySort(
        mapMap(mapGet(tablesMap, id(tableId)), (row, rowId) => [
          isUndefined(cellId) ? rowId : mapGet(row, id(cellId)),
          rowId
        ]),
        ([cell1], [cell2]) => defaultSorter(cell1, cell2) * (descending ? -1 : 1)
      ),
      offset,
      isUndefined(limit) ? limit : offset + limit
    ),
    ([, rowId]) => rowId
  );
  const getRow = (tableId, rowId) => mapToObj(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)));
  const getCellIds = (tableId, rowId) => mapKeys(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)));
  const getCell = (tableId, rowId, cellId) => mapGet(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId));
  const getValues = () => mapToObj(valuesMap);
  const getValueIds = () => mapKeys(valuesMap);
  const getValue = (valueId) => mapGet(valuesMap, id(valueId));
  const hasTables = () => !collIsEmpty(tablesMap);
  const hasTable = (tableId) => collHas(tablesMap, id(tableId));
  const hasTableCell = (tableId, cellId) => collHas(mapGet(tableCellIds, id(tableId)), id(cellId));
  const hasRow = (tableId, rowId) => collHas(mapGet(tablesMap, id(tableId)), id(rowId));
  const hasCell = (tableId, rowId, cellId) => collHas(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), id(cellId));
  const hasValues = () => !collIsEmpty(valuesMap);
  const hasValue = (valueId) => collHas(valuesMap, id(valueId));
  const getTablesJson = () => jsonStringWithMap(tablesMap);
  const getValuesJson = () => jsonStringWithMap(valuesMap);
  const getJson = () => jsonStringWithMap([tablesMap, valuesMap]);
  const getTablesSchemaJson = () => jsonStringWithMap(tablesSchemaMap);
  const getValuesSchemaJson = () => jsonStringWithMap(valuesSchemaMap);
  const getSchemaJson = () => jsonStringWithMap([tablesSchemaMap, valuesSchemaMap]);
  const setContent = (content) => fluentTransaction(
    () => validateContent(content) ? setValidContent(content) : 0
  );
  const setTables = (tables) => fluentTransaction(
    () => validateTables(tables) ? setValidTables(tables) : 0
  );
  const setTable = (tableId, table) => fluentTransaction(
    (tableId2) => validateTable(table, tableId2) ? setValidTable(tableId2, table) : 0,
    tableId
  );
  const setRow = (tableId, rowId, row) => fluentTransaction(
    (tableId2, rowId2) => validateRow(tableId2, rowId2, row) ? setValidRow(tableId2, getOrCreateTable(tableId2), rowId2, row) : 0,
    tableId,
    rowId
  );
  const addRow = (tableId, row, reuseRowIds = true) => transaction(() => {
    let rowId = void 0;
    if (validateRow(tableId, rowId, row)) {
      tableId = id(tableId);
      setValidRow(
        tableId,
        getOrCreateTable(tableId),
        rowId = getNewRowId(tableId, reuseRowIds ? 1 : 0),
        row
      );
    }
    return rowId;
  });
  const setPartialRow = (tableId, rowId, partialRow) => fluentTransaction(
    (tableId2, rowId2) => {
      if (validateRow(tableId2, rowId2, partialRow, 1)) {
        const table = getOrCreateTable(tableId2);
        objToArray(
          partialRow,
          (cell, cellId) => setCellIntoDefaultRow(tableId2, table, rowId2, cellId, cell)
        );
      }
    },
    tableId,
    rowId
  );
  const setCell = (tableId, rowId, cellId, cell) => fluentTransaction(
    (tableId2, rowId2, cellId2) => ifNotUndefined(
      getValidatedCell(
        tableId2,
        rowId2,
        cellId2,
        isFunction(cell) ? cell(getCell(tableId2, rowId2, cellId2)) : cell
      ),
      (validCell) => setCellIntoDefaultRow(
        tableId2,
        getOrCreateTable(tableId2),
        rowId2,
        cellId2,
        validCell
      )
    ),
    tableId,
    rowId,
    cellId
  );
  const setValues = (values) => fluentTransaction(
    () => validateValues(values) ? setValidValues(values) : 0
  );
  const setPartialValues = (partialValues) => fluentTransaction(
    () => validateValues(partialValues, 1) ? objToArray(
      partialValues,
      (value, valueId) => setValidValue(valueId, value)
    ) : 0
  );
  const setValue = (valueId, value) => fluentTransaction(
    (valueId2) => ifNotUndefined(
      getValidatedValue(
        valueId2,
        isFunction(value) ? value(getValue(valueId2)) : value
      ),
      (validValue) => setValidValue(valueId2, validValue)
    ),
    valueId
  );
  const applyChanges = (changes) => fluentTransaction(() => {
    objToArray(
      changes[0],
      (table, tableId) => isUndefined(table) ? delTable(tableId) : objToArray(
        table,
        (row, rowId) => isUndefined(row) ? delRow(tableId, rowId) : objToArray(
          row,
          (cell, cellId) => setOrDelCell(store2, tableId, rowId, cellId, cell)
        )
      )
    );
    objToArray(
      changes[1],
      (value, valueId) => setOrDelValue(store2, valueId, value)
    );
  });
  const setTablesJson = (tablesJson) => {
    try {
      setOrDelTables(jsonParse(tablesJson));
    } catch {
    }
    return store2;
  };
  const setValuesJson = (valuesJson) => {
    try {
      setOrDelValues(jsonParse(valuesJson));
    } catch {
    }
    return store2;
  };
  const setJson = (tablesAndValuesJson) => fluentTransaction(() => {
    try {
      const [tables, values] = jsonParse(tablesAndValuesJson);
      setOrDelTables(tables);
      setOrDelValues(values);
    } catch {
      setTablesJson(tablesAndValuesJson);
    }
  });
  const setTablesSchema = (tablesSchema) => fluentTransaction(() => {
    if (hasTablesSchema = validateTablesSchema(tablesSchema)) {
      setValidTablesSchema(tablesSchema);
      if (!collIsEmpty(tablesMap)) {
        const tables = getTables();
        delTables();
        setTables(tables);
      }
    }
  });
  const setValuesSchema = (valuesSchema) => fluentTransaction(() => {
    if (hasValuesSchema = validateValuesSchema(valuesSchema)) {
      const values = getValues();
      delValuesSchema();
      delValues();
      hasValuesSchema = true;
      setValidValuesSchema(valuesSchema);
      setValues(values);
    }
  });
  const setSchema = (tablesSchema, valuesSchema) => fluentTransaction(() => {
    setTablesSchema(tablesSchema);
    setValuesSchema(valuesSchema);
  });
  const delTables = () => fluentTransaction(() => setValidTables({}));
  const delTable = (tableId) => fluentTransaction(
    (tableId2) => collHas(tablesMap, tableId2) ? delValidTable(tableId2) : 0,
    tableId
  );
  const delRow = (tableId, rowId) => fluentTransaction(
    (tableId2, rowId2) => ifNotUndefined(
      mapGet(tablesMap, tableId2),
      (tableMap) => collHas(tableMap, rowId2) ? delValidRow(tableId2, tableMap, rowId2) : 0
    ),
    tableId,
    rowId
  );
  const delCell = (tableId, rowId, cellId, forceDel) => fluentTransaction(
    (tableId2, rowId2, cellId2) => ifNotUndefined(
      mapGet(tablesMap, tableId2),
      (tableMap) => ifNotUndefined(
        mapGet(tableMap, rowId2),
        (rowMap) => collHas(rowMap, cellId2) ? delValidCell(
          tableId2,
          tableMap,
          rowId2,
          rowMap,
          cellId2,
          forceDel
        ) : 0
      )
    ),
    tableId,
    rowId,
    cellId
  );
  const delValues = () => fluentTransaction(() => setValidValues({}));
  const delValue = (valueId) => fluentTransaction(
    (valueId2) => collHas(valuesMap, valueId2) ? delValidValue(valueId2) : 0,
    valueId
  );
  const delTablesSchema = () => fluentTransaction(() => {
    setValidTablesSchema({});
    hasTablesSchema = false;
  });
  const delValuesSchema = () => fluentTransaction(() => {
    setValidValuesSchema({});
    hasValuesSchema = false;
  });
  const delSchema = () => fluentTransaction(() => {
    delTablesSchema();
    delValuesSchema();
  });
  const transaction = (actions, doRollback) => {
    if (transactions != -1) {
      startTransaction();
      const result = actions();
      finishTransaction(doRollback);
      return result;
    }
  };
  const startTransaction = () => {
    var _a;
    if (transactions != -1) {
      transactions++;
    }
    if (transactions == 1) {
      (_a = internalListeners[0]) == null ? void 0 : _a.call(internalListeners);
      callListeners(startTransactionListeners);
    }
    return store2;
  };
  const getTransactionChanges = () => [
    mapToObj(
      changedCells,
      (table, tableId) => mapGet(changedTableIds, tableId) === -1 ? void 0 : mapToObj(
        table,
        (row, rowId) => mapGet(mapGet(changedRowIds, tableId), rowId) === -1 ? void 0 : mapToObj(
          row,
          ([, newCell]) => newCell,
          (changedCell) => pairIsEqual(changedCell)
        ),
        collIsEmpty,
        objIsEmpty
      ),
      collIsEmpty,
      objIsEmpty
    ),
    mapToObj(
      changedValues,
      ([, newValue]) => newValue,
      (changedValue) => pairIsEqual(changedValue)
    ),
    1
  ];
  const getTransactionLog = () => [
    !collIsEmpty(changedCells),
    !collIsEmpty(changedValues),
    mapToObj3(changedCells, pairClone, pairIsEqual),
    mapToObj3(invalidCells),
    mapToObj(changedValues, pairClone, pairIsEqual),
    mapToObj(invalidValues),
    mapToObj(changedTableIds),
    mapToObj2(changedRowIds),
    mapToObj3(changedCellIds),
    mapToObj(changedValueIds)
  ];
  const finishTransaction = (doRollback) => {
    var _a, _b;
    if (transactions > 0) {
      transactions--;
      if (transactions == 0) {
        transactions = 1;
        callInvalidCellListeners(1);
        if (!collIsEmpty(changedCells)) {
          callTabularListenersForChanges(1);
        }
        callInvalidValueListeners(1);
        if (!collIsEmpty(changedValues)) {
          callValuesListenersForChanges(1);
        }
        if (doRollback == null ? void 0 : doRollback(store2)) {
          collForEach(
            changedCells,
            (table, tableId) => collForEach(
              table,
              (row, rowId) => collForEach(
                row,
                ([oldCell], cellId) => setOrDelCell(store2, tableId, rowId, cellId, oldCell)
              )
            )
          );
          collClear(changedCells);
          collForEach(
            changedValues,
            ([oldValue], valueId) => setOrDelValue(store2, valueId, oldValue)
          );
          collClear(changedValues);
        }
        callListeners(finishTransactionListeners[0], void 0);
        transactions = -1;
        callInvalidCellListeners(0);
        if (!collIsEmpty(changedCells)) {
          callTabularListenersForChanges(0);
        }
        callInvalidValueListeners(0);
        if (!collIsEmpty(changedValues)) {
          callValuesListenersForChanges(0);
        }
        (_a = internalListeners[1]) == null ? void 0 : _a.call(internalListeners);
        callListeners(finishTransactionListeners[1], void 0);
        (_b = internalListeners[2]) == null ? void 0 : _b.call(internalListeners);
        transactions = 0;
        hadTables = hasTables();
        hadValues = hasValues();
        arrayForEach(
          [
            changedTableIds,
            changedTableCellIds,
            changedRowCount,
            changedRowIds,
            changedCellIds,
            changedCells,
            invalidCells,
            changedValueIds,
            changedValues,
            invalidValues
          ],
          collClear
        );
      }
    }
    return store2;
  };
  const forEachTable = (tableCallback) => collForEach(
    tablesMap,
    (tableMap, tableId) => tableCallback(
      tableId,
      (rowCallback) => collForEach(
        tableMap,
        (rowMap, rowId) => rowCallback(
          rowId,
          (cellCallback) => mapForEach(rowMap, cellCallback)
        )
      )
    )
  );
  const forEachTableCell = (tableId, tableCellCallback) => mapForEach(mapGet(tableCellIds, id(tableId)), tableCellCallback);
  const forEachRow = (tableId, rowCallback) => collForEach(
    mapGet(tablesMap, id(tableId)),
    (rowMap, rowId) => rowCallback(rowId, (cellCallback) => mapForEach(rowMap, cellCallback))
  );
  const forEachCell = (tableId, rowId, cellCallback) => mapForEach(mapGet(mapGet(tablesMap, id(tableId)), id(rowId)), cellCallback);
  const forEachValue = (valueCallback) => mapForEach(valuesMap, valueCallback);
  const addSortedRowIdsListener = (tableId, cellId, descending, offset, limit, listener, mutator) => {
    let sortedRowIds = getSortedRowIds(
      tableId,
      cellId,
      descending,
      offset,
      limit
    );
    return addListener(
      () => {
        const newSortedRowIds = getSortedRowIds(
          tableId,
          cellId,
          descending,
          offset,
          limit
        );
        if (!arrayIsEqual(newSortedRowIds, sortedRowIds)) {
          sortedRowIds = newSortedRowIds;
          listener(
            store2,
            tableId,
            cellId,
            descending,
            offset,
            limit,
            sortedRowIds
          );
        }
      },
      sortedRowIdsListeners[mutator ? 1 : 0],
      [tableId, cellId],
      [getTableIds]
    );
  };
  const addStartTransactionListener = (listener) => addListener(listener, startTransactionListeners);
  const addWillFinishTransactionListener = (listener) => addListener(listener, finishTransactionListeners[0]);
  const addDidFinishTransactionListener = (listener) => addListener(listener, finishTransactionListeners[1]);
  const callListener = (listenerId) => {
    callListenerImpl(listenerId);
    return store2;
  };
  const delListener = (listenerId) => {
    delListenerImpl(listenerId);
    return store2;
  };
  const getListenerStats = () => ({
    hasTables: pairCollSize2(hasTablesListeners),
    tables: pairCollSize2(tablesListeners),
    tableIds: pairCollSize2(tableIdsListeners),
    hasTable: pairCollSize2(hasTableListeners),
    table: pairCollSize2(tableListeners),
    tableCellIds: pairCollSize2(tableCellIdsListeners),
    hasTableCell: pairCollSize2(hasTableCellListeners, collSize3),
    rowCount: pairCollSize2(rowCountListeners),
    rowIds: pairCollSize2(rowIdsListeners),
    sortedRowIds: pairCollSize2(sortedRowIdsListeners),
    hasRow: pairCollSize2(hasRowListeners, collSize3),
    row: pairCollSize2(rowListeners, collSize3),
    cellIds: pairCollSize2(cellIdsListeners, collSize3),
    hasCell: pairCollSize2(hasCellListeners, collSize4),
    cell: pairCollSize2(cellListeners, collSize4),
    invalidCell: pairCollSize2(invalidCellListeners, collSize4),
    hasValues: pairCollSize2(hasValuesListeners),
    values: pairCollSize2(valuesListeners),
    valueIds: pairCollSize2(valueIdsListeners),
    hasValue: pairCollSize2(hasValueListeners),
    value: pairCollSize2(valueListeners),
    invalidValue: pairCollSize2(invalidValueListeners),
    transaction: collSize2(startTransactionListeners) + pairCollSize2(finishTransactionListeners)
  });
  const setInternalListeners = (preStartTransaction, preFinishTransaction, postFinishTransaction, cellChanged2, valueChanged2) => internalListeners = [
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged2,
    valueChanged2
  ];
  const store2 = {
    getContent,
    getTables,
    getTableIds,
    getTable,
    getTableCellIds,
    getRowCount,
    getRowIds,
    getSortedRowIds,
    getRow,
    getCellIds,
    getCell,
    getValues,
    getValueIds,
    getValue,
    hasTables,
    hasTable,
    hasTableCell,
    hasRow,
    hasCell,
    hasValues,
    hasValue,
    getTablesJson,
    getValuesJson,
    getJson,
    getTablesSchemaJson,
    getValuesSchemaJson,
    getSchemaJson,
    hasTablesSchema: () => hasTablesSchema,
    hasValuesSchema: () => hasValuesSchema,
    setContent,
    setTables,
    setTable,
    setRow,
    addRow,
    setPartialRow,
    setCell,
    setValues,
    setPartialValues,
    setValue,
    applyChanges,
    setTablesJson,
    setValuesJson,
    setJson,
    setTablesSchema,
    setValuesSchema,
    setSchema,
    delTables,
    delTable,
    delRow,
    delCell,
    delValues,
    delValue,
    delTablesSchema,
    delValuesSchema,
    delSchema,
    transaction,
    startTransaction,
    getTransactionChanges,
    getTransactionLog,
    finishTransaction,
    forEachTable,
    forEachTableCell,
    forEachRow,
    forEachCell,
    forEachValue,
    addSortedRowIdsListener,
    addStartTransactionListener,
    addWillFinishTransactionListener,
    addDidFinishTransactionListener,
    callListener,
    delListener,
    getListenerStats,
    isMergeable: () => false,
    // only used internally by other modules
    createStore,
    addListener,
    callListeners,
    setInternalListeners
  };
  objToArray(
    {
      [HAS + TABLES]: [0, hasTablesListeners, [], () => [hasTables()]],
      [TABLES]: [0, tablesListeners],
      [TABLE_IDS]: [0, tableIdsListeners],
      [HAS + TABLE]: [
        1,
        hasTableListeners,
        [getTableIds],
        (ids) => [hasTable(...ids)]
      ],
      [TABLE]: [1, tableListeners, [getTableIds]],
      [TABLE + CELL_IDS]: [1, tableCellIdsListeners, [getTableIds]],
      [HAS + TABLE + CELL]: [
        2,
        hasTableCellListeners,
        [getTableIds, getTableCellIds],
        (ids) => [hasTableCell(...ids)]
      ],
      [ROW_COUNT]: [1, rowCountListeners, [getTableIds]],
      [ROW_IDS]: [1, rowIdsListeners, [getTableIds]],
      [HAS + ROW]: [
        2,
        hasRowListeners,
        [getTableIds, getRowIds],
        (ids) => [hasRow(...ids)]
      ],
      [ROW]: [2, rowListeners, [getTableIds, getRowIds]],
      [CELL_IDS]: [2, cellIdsListeners, [getTableIds, getRowIds]],
      [HAS + CELL]: [
        3,
        hasCellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => [hasCell(...ids)]
      ],
      [CELL]: [
        3,
        cellListeners,
        [getTableIds, getRowIds, getCellIds],
        (ids) => pairNew(getCell(...ids))
      ],
      InvalidCell: [3, invalidCellListeners],
      [HAS + VALUES]: [0, hasValuesListeners, [], () => [hasValues()]],
      [VALUES]: [0, valuesListeners],
      [VALUE_IDS]: [0, valueIdsListeners],
      [HAS + VALUE]: [
        1,
        hasValueListeners,
        [getValueIds],
        (ids) => [hasValue(...ids)]
      ],
      [VALUE]: [
        1,
        valueListeners,
        [getValueIds],
        (ids) => pairNew(getValue(ids[0]))
      ],
      InvalidValue: [1, invalidValueListeners]
    },
    ([argumentCount, idSetNode, pathGetters, extraArgsGetter], listenable) => {
      store2[ADD + listenable + LISTENER] = (...args) => addListener(
        args[argumentCount],
        idSetNode[args[argumentCount + 1] ? 1 : 0],
        argumentCount > 0 ? slice(args, 0, argumentCount) : void 0,
        pathGetters,
        extraArgsGetter
      );
    }
  );
  return objFreeze(store2);
};
const SHIFT36 = 2 ** 36;
const SHIFT30 = 2 ** 30;
const SHIFT24 = 2 ** 24;
const SHIFT18 = 2 ** 18;
const SHIFT12 = 2 ** 12;
const SHIFT6 = 2 ** 6;
const encodeTimeAndCounter = (logicalTime42, counter24) => encode(logicalTime42 / SHIFT36) + encode(logicalTime42 / SHIFT30) + encode(logicalTime42 / SHIFT24) + encode(logicalTime42 / SHIFT18) + encode(logicalTime42 / SHIFT12) + encode(logicalTime42 / SHIFT6) + encode(logicalTime42) + encode(counter24 / SHIFT18) + encode(counter24 / SHIFT12) + encode(counter24 / SHIFT6) + encode(counter24);
const decodeTimeAndCounter = (hlc16) => [
  decode(hlc16, 0) * SHIFT36 + decode(hlc16, 1) * SHIFT30 + decode(hlc16, 2) * SHIFT24 + decode(hlc16, 3) * SHIFT18 + decode(hlc16, 4) * SHIFT12 + decode(hlc16, 5) * SHIFT6 + decode(hlc16, 6),
  decode(hlc16, 7) * SHIFT18 + decode(hlc16, 8) * SHIFT12 + decode(hlc16, 9) * SHIFT6 + decode(hlc16, 10)
];
const getHlcFunctions = (uniqueId) => {
  let logicalTime = 0;
  let lastCounter = -1;
  const clientPart = ifNotUndefined(
    uniqueId,
    (uniqueId2) => {
      const clientHash30 = getHash(uniqueId2);
      return encode(clientHash30 / SHIFT24) + encode(clientHash30 / SHIFT18) + encode(clientHash30 / SHIFT12) + encode(clientHash30 / SHIFT6) + encode(clientHash30);
    },
    () => getUniqueId(5)
  );
  const getHlc = () => {
    seenHlc();
    return encodeTimeAndCounter(logicalTime, ++lastCounter) + clientPart;
  };
  const seenHlc = (hlc) => {
    const previousLogicalTime = logicalTime;
    const [remoteLogicalTime, remoteCounter] = isUndefined(hlc) || hlc == "" ? [0, 0] : decodeTimeAndCounter(hlc);
    logicalTime = mathMax(
      previousLogicalTime,
      remoteLogicalTime,
      GLOBAL.HLC_TIME ?? Date.now()
    );
    lastCounter = logicalTime == previousLogicalTime ? logicalTime == remoteLogicalTime ? mathMax(lastCounter, remoteCounter) : lastCounter : logicalTime == remoteLogicalTime ? remoteCounter : -1;
  };
  return [getHlc, seenHlc];
};
const LISTENER_ARGS = {
  HasTable: 1,
  Table: 1,
  TableCellIds: 1,
  HasTableCell: 2,
  RowCount: 1,
  RowIds: 1,
  SortedRowIds: 5,
  HasRow: 2,
  Row: 2,
  CellIds: 2,
  HasCell: 3,
  Cell: 3,
  HasValue: 1,
  Value: 1,
  InvalidCell: 3,
  InvalidValue: 1
};
const newContentStampMap = (time = EMPTY_STRING) => [
  stampNewMap(time),
  stampNewMap(time)
];
const validateMergeableContent = (mergeableContent) => isArray(mergeableContent) && size(mergeableContent) == 2 && stampValidate(
  mergeableContent[0],
  (tableStamps) => objValidate(
    tableStamps,
    (tableStamp) => stampValidate(
      tableStamp,
      (rowStamps) => objValidate(
        rowStamps,
        (rowStamp) => stampValidate(
          rowStamp,
          (cellStamps) => objValidate(
            cellStamps,
            (cellStamp) => stampValidate(cellStamp, isCellOrValueOrNullOrUndefined),
            void 0,
            1
          )
        ),
        void 0,
        1
      )
    ),
    void 0,
    1
  )
) && stampValidate(
  mergeableContent[1],
  (values) => objValidate(
    values,
    (value) => stampValidate(value, isCellOrValueOrNullOrUndefined),
    void 0,
    1
  )
);
const createMergeableStore = (uniqueId) => {
  let listeningToRawStoreChanges = 1;
  let contentStampMap = newContentStampMap();
  let defaultingContent = 0;
  const touchedCells = mapNew();
  const touchedValues = setNew();
  const [getHlc, seenHlc] = getHlcFunctions(uniqueId);
  const store2 = createStore();
  const disableListeningToRawStoreChanges = (actions) => {
    const wasListening = listeningToRawStoreChanges;
    listeningToRawStoreChanges = 0;
    actions();
    listeningToRawStoreChanges = wasListening;
    return mergeableStore;
  };
  const mergeContentOrChanges = (contentOrChanges, isContent = 0) => {
    const tablesChanges = {};
    const valuesChanges = {};
    const [
      [tablesObj, incomingTablesTime = EMPTY_STRING, incomingTablesHash = 0],
      values
    ] = contentOrChanges;
    const [tablesStampMap, valuesStampMap] = contentStampMap;
    const [tableStampMaps, oldTablesTime, oldTablesHash] = tablesStampMap;
    let tablesHash = isContent ? incomingTablesHash : oldTablesHash;
    let tablesTime = incomingTablesTime;
    objForEach(
      tablesObj,
      ([rowsObj, incomingTableTime = EMPTY_STRING, incomingTableHash = 0], tableId) => {
        const tableStampMap = mapEnsure(tableStampMaps, tableId, stampNewMap);
        const [rowStampMaps, oldTableTime, oldTableHash] = tableStampMap;
        let tableHash = isContent ? incomingTableHash : oldTableHash;
        let tableTime = incomingTableTime;
        objForEach(rowsObj, (row, rowId) => {
          const [rowTime, oldRowHash, rowHash] = mergeCellsOrValues(
            row,
            mapEnsure(rowStampMaps, rowId, stampNewMap),
            objEnsure(objEnsure(tablesChanges, tableId, objNew), rowId, objNew),
            isContent
          );
          tableHash ^= isContent ? 0 : (oldRowHash ? hashIdAndHash(rowId, oldRowHash) : 0) ^ hashIdAndHash(rowId, rowHash);
          tableTime = getLatestTime(tableTime, rowTime);
        });
        tableHash ^= isContent ? 0 : replaceTimeHash(oldTableTime, incomingTableTime);
        stampUpdate(tableStampMap, tableHash, incomingTableTime);
        tablesHash ^= isContent ? 0 : (oldTableHash ? hashIdAndHash(tableId, oldTableHash) : 0) ^ hashIdAndHash(tableId, tableStampMap[2]);
        tablesTime = getLatestTime(tablesTime, tableTime);
      }
    );
    tablesHash ^= isContent ? 0 : replaceTimeHash(oldTablesTime, incomingTablesTime);
    stampUpdate(tablesStampMap, tablesHash, incomingTablesTime);
    const [valuesTime] = mergeCellsOrValues(
      values,
      valuesStampMap,
      valuesChanges,
      isContent
    );
    seenHlc(getLatestTime(tablesTime, valuesTime));
    return [tablesChanges, valuesChanges, 1];
  };
  const mergeCellsOrValues = (things, thingsStampMap, thingsChanges, isContent) => {
    const [
      thingsObj,
      incomingThingsTime = EMPTY_STRING,
      incomingThingsHash = 0
    ] = things;
    const [thingStampMaps, oldThingsTime, oldThingsHash] = thingsStampMap;
    let thingsTime = incomingThingsTime;
    let thingsHash = isContent ? incomingThingsHash : oldThingsHash;
    objForEach(
      thingsObj,
      ([thing, thingTime, incomingThingHash = 0], thingId) => {
        const thingStampMap = mapEnsure(thingStampMaps, thingId, () => [
          void 0,
          EMPTY_STRING,
          0
        ]);
        const [, oldThingTime, oldThingHash] = thingStampMap;
        if (!oldThingTime || thingTime > oldThingTime) {
          stampUpdate(
            thingStampMap,
            isContent ? incomingThingHash : getHash(jsonStringWithMap(thing ?? null) + ":" + thingTime),
            thingTime
          );
          thingStampMap[0] = thing;
          thingsChanges[thingId] = thing;
          thingsHash ^= isContent ? 0 : hashIdAndHash(thingId, oldThingHash) ^ hashIdAndHash(thingId, thingStampMap[2]);
          thingsTime = getLatestTime(thingsTime, thingTime);
        }
      }
    );
    thingsHash ^= isContent ? 0 : replaceTimeHash(oldThingsTime, incomingThingsTime);
    stampUpdate(thingsStampMap, thingsHash, incomingThingsTime);
    return [thingsTime, oldThingsHash, thingsStampMap[2]];
  };
  const preStartTransaction = () => {
  };
  const preFinishTransaction = () => {
  };
  const postFinishTransaction = () => {
    collClear(touchedCells);
    collClear(touchedValues);
  };
  const cellChanged = (tableId, rowId, cellId, newCell) => {
    setAdd(
      mapEnsure(mapEnsure(touchedCells, tableId, mapNew), rowId, setNew),
      cellId
    );
    if (listeningToRawStoreChanges) {
      mergeContentOrChanges([
        [
          {
            [tableId]: [
              {
                [rowId]: [
                  {
                    [cellId]: [
                      newCell,
                      defaultingContent ? EMPTY_STRING : getHlc()
                    ]
                  }
                ]
              }
            ]
          }
        ],
        [{}],
        1
      ]);
    }
  };
  const valueChanged = (valueId, newValue) => {
    setAdd(touchedValues, valueId);
    if (listeningToRawStoreChanges) {
      mergeContentOrChanges([
        [{}],
        [{ [valueId]: [newValue, defaultingContent ? EMPTY_STRING : getHlc()] }],
        1
      ]);
    }
  };
  const getMergeableContent = () => [
    stampMapToObjWithHash(
      contentStampMap[0],
      (tableStampMap) => stampMapToObjWithHash(
        tableStampMap,
        (rowStampMap) => stampMapToObjWithHash(rowStampMap)
      )
    ),
    stampMapToObjWithHash(contentStampMap[1])
  ];
  const getMergeableContentHashes = () => [
    contentStampMap[0][2],
    contentStampMap[1][2]
  ];
  const getMergeableTableHashes = () => mapToObj(contentStampMap[0][0], getStampHash);
  const getMergeableTableDiff = (otherTableHashes) => {
    const newTables = stampNewObj(contentStampMap[0][1]);
    const differingTableHashes = {};
    mapForEach(
      contentStampMap[0][0],
      (tableId, [tableStampMap, tableTime, hash]) => objHas(otherTableHashes, tableId) ? hash != otherTableHashes[tableId] ? differingTableHashes[tableId] = hash : 0 : newTables[0][tableId] = stampMapToObjWithoutHash(
        [tableStampMap, tableTime],
        (rowStampMap) => stampMapToObjWithoutHash(rowStampMap)
      )
    );
    return [newTables, differingTableHashes];
  };
  const getMergeableRowHashes = (otherTableHashes) => {
    const rowHashes = {};
    objForEach(
      otherTableHashes,
      (otherTableHash, tableId) => ifNotUndefined(
        mapGet(contentStampMap[0][0], tableId),
        ([rowStampMaps, , tableHash]) => tableHash != otherTableHash ? mapForEach(
          rowStampMaps,
          (rowId, [, , rowHash]) => objEnsure(rowHashes, tableId, objNew)[rowId] = rowHash
        ) : 0
      )
    );
    return rowHashes;
  };
  const getMergeableRowDiff = (otherTableRowHashes) => {
    const newRows = stampNewObj(contentStampMap[0][1]);
    const differingRowHashes = {};
    objForEach(
      otherTableRowHashes,
      (otherRowHashes, tableId) => {
        var _a;
        return mapForEach(
          (_a = mapGet(contentStampMap[0][0], tableId)) == null ? void 0 : _a[0],
          (rowId, [rowStampMap, rowTime, hash]) => objHas(otherRowHashes, rowId) ? hash !== otherRowHashes[rowId] ? objEnsure(differingRowHashes, tableId, objNew)[rowId] = hash : 0 : objEnsure(newRows[0], tableId, stampNewObj)[0][rowId] = stampMapToObjWithoutHash([rowStampMap, rowTime])
        );
      }
    );
    return [newRows, differingRowHashes];
  };
  const getMergeableCellHashes = (otherTableRowHashes) => {
    const cellHashes = {};
    objForEach(
      otherTableRowHashes,
      (otherRowHashes, tableId) => ifNotUndefined(
        mapGet(contentStampMap[0][0], tableId),
        ([rowStampMaps]) => objForEach(
          otherRowHashes,
          (otherRowHash, rowId) => ifNotUndefined(
            mapGet(rowStampMaps, rowId),
            ([cellStampMaps, , rowHash]) => rowHash !== otherRowHash ? mapForEach(
              cellStampMaps,
              (cellId, [, , cellHash]) => objEnsure(
                objEnsure(cellHashes, tableId, objNew),
                rowId,
                objNew
              )[cellId] = cellHash
            ) : 0
          )
        )
      )
    );
    return cellHashes;
  };
  const getMergeableCellDiff = (otherTableRowCellHashes) => {
    const [[tableStampMaps, tablesTime]] = contentStampMap;
    const tablesObj = {};
    objForEach(
      otherTableRowCellHashes,
      (otherRowCellHashes, tableId) => objForEach(
        otherRowCellHashes,
        (otherCellHashes, rowId) => ifNotUndefined(
          mapGet(tableStampMaps, tableId),
          ([rowStampMaps, tableTime]) => ifNotUndefined(
            mapGet(rowStampMaps, rowId),
            ([cellStampMaps, rowTime]) => mapForEach(
              cellStampMaps,
              (cellId, [cell, cellTime, hash]) => hash !== otherCellHashes[cellId] ? objEnsure(
                objEnsure(
                  tablesObj,
                  tableId,
                  () => stampNewObj(tableTime)
                )[0],
                rowId,
                () => stampNewObj(rowTime)
              )[0][cellId] = [cell, cellTime] : 0
            )
          )
        )
      )
    );
    return newStamp(tablesObj, tablesTime);
  };
  const getMergeableValueHashes = () => mapToObj(contentStampMap[1][0], getStampHash);
  const getMergeableValueDiff = (otherValueHashes) => {
    const [, [valueStampMaps, valuesTime]] = contentStampMap;
    const values = mapToObj(
      valueStampMaps,
      stampCloneWithoutHash,
      ([, , hash], valueId) => hash == (otherValueHashes == null ? void 0 : otherValueHashes[valueId])
    );
    return newStamp(values, valuesTime);
  };
  const setMergeableContent = (mergeableContent) => disableListeningToRawStoreChanges(
    () => validateMergeableContent(mergeableContent) ? store2.transaction(() => {
      store2.delTables().delValues();
      contentStampMap = newContentStampMap();
      store2.applyChanges(mergeContentOrChanges(mergeableContent, 1));
    }) : 0
  );
  const setDefaultContent = (content) => {
    store2.transaction(() => {
      defaultingContent = 1;
      store2.setContent(content);
      defaultingContent = 0;
    });
    return mergeableStore;
  };
  const getTransactionMergeableChanges = () => {
    const [[tableStampMaps, tablesTime], [valueStampMaps, valuesTime]] = contentStampMap;
    const tablesObj = {};
    collForEach(
      touchedCells,
      (touchedTable, tableId) => ifNotUndefined(
        mapGet(tableStampMaps, tableId),
        ([rowStampMaps, tableTime]) => {
          const tableObj = {};
          collForEach(
            touchedTable,
            (touchedRow, rowId) => ifNotUndefined(
              mapGet(rowStampMaps, rowId),
              ([cellStampMaps, rowTime]) => {
                const rowObj = {};
                collForEach(touchedRow, (cellId) => {
                  ifNotUndefined(
                    mapGet(cellStampMaps, cellId),
                    ([cell, time]) => rowObj[cellId] = newStamp(cell, time)
                  );
                });
                tableObj[rowId] = newStamp(rowObj, rowTime);
              }
            )
          );
          tablesObj[tableId] = newStamp(tableObj, tableTime);
        }
      )
    );
    const valuesObj = {};
    collForEach(
      touchedValues,
      (valueId) => ifNotUndefined(
        mapGet(valueStampMaps, valueId),
        ([value, time]) => valuesObj[valueId] = newStamp(value, time)
      )
    );
    return [
      newStamp(tablesObj, tablesTime),
      newStamp(valuesObj, valuesTime),
      1
    ];
  };
  const applyMergeableChanges = (mergeableChanges) => disableListeningToRawStoreChanges(
    () => store2.applyChanges(mergeContentOrChanges(mergeableChanges))
  );
  const merge = (mergeableStore2) => {
    const mergeableChanges = getMergeableContent();
    const mergeableChanges2 = mergeableStore2.getMergeableContent();
    mergeableStore2.applyMergeableChanges(mergeableChanges);
    return applyMergeableChanges(mergeableChanges2);
  };
  const mergeableStore = {
    getMergeableContent,
    getMergeableContentHashes,
    getMergeableTableHashes,
    getMergeableTableDiff,
    getMergeableRowHashes,
    getMergeableRowDiff,
    getMergeableCellHashes,
    getMergeableCellDiff,
    getMergeableValueHashes,
    getMergeableValueDiff,
    setMergeableContent,
    setDefaultContent,
    getTransactionMergeableChanges,
    applyMergeableChanges,
    merge
  };
  store2.setInternalListeners(
    preStartTransaction,
    preFinishTransaction,
    postFinishTransaction,
    cellChanged,
    valueChanged
  );
  objToArray(
    store2,
    (method, name) => mergeableStore[name] = // fluent methods
    strStartsWith(name, "set") || strStartsWith(name, "del") || strStartsWith(name, "apply") || strEndsWith(name, "Transaction") || name == "callListener" ? (...args) => {
      method(...args);
      return mergeableStore;
    } : strStartsWith(name, "add") && strEndsWith(name, "Listener") ? (...args) => {
      const listenerArg = LISTENER_ARGS[slice(name, 3, -8)] ?? 0;
      const listener = args[listenerArg];
      args[listenerArg] = (_store, ...args2) => listener(mergeableStore, ...args2);
      return method(...args);
    } : name == "isMergeable" ? () => true : method
  );
  return objFreeze(mergeableStore);
};
const store = createMergeableStore();
const PERSISTENCE_KEY = "cookieStoreData";
const persister = createCustomPersister(
  store,
  async () => {
    return new Promise((resolve) => {
      chrome.storage.local.get([PERSISTENCE_KEY], (result) => {
        try {
          resolve(result[PERSISTENCE_KEY] ? JSON.parse(result[PERSISTENCE_KEY]) : null);
        } catch {
          resolve(null);
        }
      });
    });
  },
  async (getContent) => {
    const content = JSON.stringify(getContent());
    return new Promise((resolve) => {
      chrome.storage.local.set({ [PERSISTENCE_KEY]: content }, () => {
        resolve();
      });
    });
  },
  (listener) => {
    const handleChange = (changes, area) => {
      if (area === "local" && PERSISTENCE_KEY in changes) {
        listener();
      }
    };
    chrome.storage.onChanged.addListener(handleChange);
    return handleChange;
  },
  (handleChange) => {
    chrome.storage.onChanged.removeListener(handleChange);
  }
);
async function init() {
  await persister.startAutoLoad();
  console.log("Initial data loaded:", store.getTables());
  await persister.startAutoSave();
}
init();
chrome.action.onClicked.addListener(async (tab) => {
  const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    files: ["insert.js"]
  });
});
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.contextMenus.create({
    "id": `airssSelector`,
    "title": "✨AiRss选择器",
    "contexts": ["all"]
  });
  chrome.contextMenus.create({
    "id": "readLater",
    "title": "⏳添加到稍后读",
    "contexts": ["selection", "page"]
  });
});
chrome.contextMenus.onClicked.addListener(async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (e.menuItemId === "airssSelector") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["insert.js"]
    });
  }
  if (e.menuItemId === "readLater") {
    chrome.storage.local.get(["cf-select-box-settings"], async function(result) {
      const settings = result["cf-select-box-settings"];
      if (!(settings == null ? void 0 : settings.addKey) || !(settings == null ? void 0 : settings.serverUrl)) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "logo.48.png",
          title: "配置缺失",
          message: "请先在插件设置中配置服务器地址和添加密钥"
        });
        return;
      }
      try {
        const response = await fetch(`${settings.serverUrl}/read-later`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Add-Key": settings.addKey
          },
          body: JSON.stringify({
            url: tab.url,
            title: tab.title,
            text: e.selectionText || ""
          })
        });
        if (response.ok) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "logo.48.png",
            title: "添加成功",
            message: "已添加到稍后读列表"
          });
        } else {
          console.log(await response.text());
          throw new Error("添加失败");
        }
      } catch (error) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "logo.48.png",
          title: "AiRSS通知",
          message: error.message
        });
      }
    });
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getPageHtml") {
    const { url, selector = "body" } = request;
    chrome.tabs.create({ url, active: false, pinned: true }, function(tab) {
      const tabId = tab.id;
      chrome.tabs.onUpdated.addListener(function updatedListener(updatedTabId, info) {
        if (updatedTabId === tabId && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(updatedListener);
          chrome.scripting.executeScript({
            target: { tabId },
            func: (sel) => {
              const element = document.querySelector(sel);
              return element ? element.outerHTML : null;
            },
            args: [selector]
          }, (results) => {
            if (chrome.runtime.lastError) {
              sendResponse({ error: chrome.runtime.lastError.message });
            } else {
              const result = results[0].result;
              sendResponse({ html: result });
            }
            chrome.tabs.remove(tabId);
          });
        }
      });
    });
    return true;
  }
});
