/* eslint-disable import/prefer-default-export */
// Global Types
import type {
  Request as $Request,
  Response as $Response,
} from 'express';

// Helpers
import os from 'os';
import osUtils from 'node-os-utils'; // Types

type $LoadValue = Array<number>;
type $DiskValue = {
  freeGb: string;
  freePercentage: string;
  totalGb: string;
  usedGb: string;
  usedPercentage: string;
};
type $MemValue = {
  freeMemMb: number;
  freeMemPercentage: number;
  totalMemMb: number;
  usedMemMb: number;
};
type $UptimeValue = {
  container: number;
  os: number;
};
type $SystemValues = {
  disk: $DiskValue;
  load: $LoadValue;
  mem: $MemValue;
  uptime: $UptimeValue;
};

type $GetSystemValues = () => Promise<$SystemValues>;

const getSystemValues: $GetSystemValues = async () => {
  const load = await osUtils.cpu.loadavg();
  const disk = await osUtils.drive.info();
  const mem = await osUtils.mem.info();
  const uptime = {
    container: process.uptime(),
    os: os.uptime(),
  };

  return {
    disk,
    load,
    mem,
    uptime,
  };
};

type $HealthRoute = (req: $Request, res: $Response) => Promise<void>;

export const healthRoute: $HealthRoute = async (req, res) => {
  const output = await getSystemValues();

  res.json(output);
};
