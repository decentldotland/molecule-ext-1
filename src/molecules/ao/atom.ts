import { dryrun } from "@permaweb/aoconnect";

export async function aoDryRunData(pid: string, tags: string, data: any) {
  try {
    const tx: any = await dryrun({
      process: pid,
      data: data,
      tags: JSON.parse(atob(tags)),
    });

    return JSON.parse(tx.Messages[0].Data);
  } catch (error) {
    console.log(error);
    return {};
  }
}
