import l0 from "./scripts/level_0.script";
import l1 from "./scripts/level_1.script";
import l2 from "./scripts/level_2.script";
import l3 from "./scripts/level_3.script";
import l4 from "./scripts/level_4.script";
import l5 from "./scripts/level_5.script";
import l6 from "./scripts/level_6.script";
import l7 from "./scripts/level_7.script";
import l8 from "./scripts/level_8.script";
import l9 from "./scripts/level_9.script";

export async function main() {
  // return await l0();
  // return await l1();
  // return await l2();
  // return await l3();
  // return await l4();
  // return await l5();
  // return await l6();
  // return await l7();
  // return await l8();
  return await l9();
}

main().then(console.log).catch(console.error);
