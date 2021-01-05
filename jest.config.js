module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: 'node',
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    globals: {
      'ts-jest': {
        diagnostics: {
          warnOnly: true,
          pathRegex: /\.(spec|test)\.ts$/
        }
      }
    }
    
  };