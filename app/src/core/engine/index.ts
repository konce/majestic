import { getTestPatternsMatcher } from './fileMatcher';
import TestFiles from './TestFiles';
import Runner from './Runner';
import { Config } from './types/Config';
import Watcher from './Watcher';
import Preference from './Preference';
const launchEditor = require('react-dev-utils/launchEditor');
const readPkgUp = require('read-pkg-up');

export default class Engine {
  root: string;
  testMatcher: (path: string) => boolean;
  testFiles: TestFiles;
  testRunner: Runner;
  watcher: Watcher;
  preference: Preference;

  constructor(rootPath: string, config: Config) {
    this.root = rootPath;
    this.testMatcher = getTestPatternsMatcher(rootPath, config);
    this.testFiles = new TestFiles(this);
    this.preference = new Preference();
    this.testRunner = new Runner(this, config, this.preference);
    this.watcher = new Watcher(rootPath);
  }

  launchEditor(path: string, lineNo: number) {
    launchEditor(path, lineNo);
  }

  getVersion() {
    return readPkgUp({
      cwd: __dirname
    }).then((result: any) => {
      return result.pkg.version;
    });
  }
}
