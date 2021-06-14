"use strict"
class CodeObject{
  constructor(param){
    this._id = param._id;
    this.codename = param.codename;
    this.useYN = param.useYN;
    this.language = param.language;
    this.isChild = param.isChild;
    this.childCodes = param.childCodes;
    this.createUserId = param.createUserId;
    this.updateUserId = param.updateUserId;
  }

  getParamBody(){
    let param = {}
    if (this._id !== null) param._id = this._id;
    if (this.codename !== null) param.codename = this.codename;
    if (this.useYN !== null) param.useYN = this.useYN;
    if (this.language !== null) param.language = this.language;
    if (this.isChild !== null) param.isChild = this.isChild;
    if (this.childCodes !== null) param.childCodes = this.childCodes;
    if (this.createUserId !== null) param.createUserId = this.createUserId;
    if (this.updateUserId !== null) param.updateUserId = this.updateUserId;
    return param;
  }
}

export const CodeObjectBuilder = function(){
  let _id,
    codename,
    useYN,
    language,
    isChild,
    childCodes,
    createUserId,
    updateUserId;

  return {
    set_id: function(value){
      _id = value;

      return this;
    },
    setCodename: function(value){
      codename = value;

      return this;
    },
    setUseYN: function(value){
      useYN = value;

      return this;
    },
    setLanguage: function(value){
      language = value;

      return this;
    },
    setIsChild: function(value){
      isChild = value;

      return this;
    },
    setChildCodes: function(value){
      childCodes = value;

      return this;
    },
    setCreateUserId: function(value){
      createUserId = value;

      return this;
    },
    setUpdateUserId: function(value){
      updateUserId = value;

      return this;
    },
    validCheck: function(){
      if (codename === null) return `codename is null`;
      if (createUserId === null) return `createUserId is null`;
      if (updateUserId === null) return `updateUserId is null`;
      return true;
    },
    build: function(){
      let result = this.validCheck();
      if (typeof result === 'boolean' && result === true) {
        let param = {
          _id: _id,
          codename: codename, 
          useYN: useYN, 
          language: language, 
          isChild: isChild, 
          childCodes: childCodes, 
          createUserId: createUserId, 
          updateUserId: updateUserId
        }
        return new CodeObject(param);
      } else {
        throw new Error(result);
      }
    }
  }
}

export default { CodeObjectBuilder };