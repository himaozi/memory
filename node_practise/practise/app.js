if(module===require.main){
    console.log('this is a main module of application.')
}



var testModule=require('./testModule.js');
console.log(testModule.testVar)