// Copyright 2018 Bobby Powers. All rights reserved.

import * as fs from 'fs';

import { expect } from 'chai';
import { List } from 'immutable';
import { Project } from '../lib/sd';
import { FileFromJSON } from '../lib/xmile';
import { promisify } from 'util';
import { DOMParser } from 'xmldom';

const readFile = promisify(fs.readFile);

const MODEL_PATHS = List([
  'test/test-models/tests/xidz_zidz/xidz_zidz.xmile',
  'test/test-models/tests/reference_capitalization/test_reference_capitalization.xmile',
  'test/test-models/tests/parentheses/test_parens.xmile',
  'test/test-models/tests/model_doc/model_doc.xmile',
  'test/test-models/tests/log/test_log.xmile',
  'test/test-models/tests/line_continuation/test_line_continuation.xmile',
  'test/test-models/tests/line_breaks/test_line_breaks.xmile',
  'test/test-models/tests/limits/test_limits.xmile',
  'test/test-models/tests/game/test_game.xmile',
  'test/test-models/tests/function_capitalization/test_function_capitalization.xmile',
  'test/test-models/tests/constant_expressions/test_constant_expressions.xmile',
  'test/test-models/tests/chained_initialization/test_chained_initialization.xmile',
  'test/test-models/tests/trig/test_trig.xmile',
  'test/test-models/tests/sqrt/test_sqrt.xmile',
  'test/test-models/tests/number_handling/test_number_handling.xmile',
  'test/test-models/tests/logicals/test_logicals.xmile',
  'test/test-models/tests/ln/test_ln.xmile',
  'test/test-models/tests/if_stmt/if_stmt.xmile',
  'test/test-models/tests/exponentiation/exponentiation.xmile',
  'test/test-models/tests/exp/test_exp.xmile',
  'test/test-models/tests/eval_order/eval_order.xmile',
  'test/test-models/tests/comparisons/comparisons.xmile',
  'test/test-models/tests/builtin_min/builtin_min.xmile',
  'test/test-models/tests/builtin_max/builtin_max.xmile',
  'test/test-models/tests/abs/test_abs.xmile',
  'test/test-models/samples/teacup/teacup.xmile',
  'test/test-models/samples/teacup/teacup_w_diagram.xmile',
  'test/test-models/samples/bpowers-hares_and_lynxes_modules/model.xmile',
  'test/test-models/samples/SIR/SIR.xmile',
  'test/test-models/samples/SIR/SIR_reciprocal-dt.xmile',
]);

describe('roundtrip', async () => {
  for (const path of MODEL_PATHS) {
    it(`should roundtrip ${path}`, async () => {
      const data = await readFile(path);
      const xml = new DOMParser().parseFromString(data.toString(), 'application/xml');
      const project = new Project(xml);
      const files = project.getFiles();
      expect(files.size).to.equal(1);
      const file1 = files.get(0);
      const json = files.toJSON();
      console.log(JSON.stringify(json, undefined, 2));
      const [file2, err] = FileFromJSON(json);
      expect(err).to.be.undefined;
      expect(file1).to.deep.equal(file2);
    });
  }
});
