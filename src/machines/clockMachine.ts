import { send, assign } from "xstate";
import { clockModel } from "./models/events";

export const clockMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMA2B7ZBrAsgQ2QAsBLAOzADpiJUwBiAZQBUBBAJScVAAd1ZiALsXSkuIAB6IAtAFYAnHIpyZMgOwyAHBoAMAFg1ztGgDQgAntICMmihpnbLugExONANmfPVAX2+m0mLgEJOQUQgC2YAD6AE4ArqSkZFCMTADyAApRTACSOACiYrz8QiJikgiyloraMroO2rWGlm4yphaVcqq2OgDMbk79lhpObm6+-hjY+ERklBHR8YnJdGz5DPmcSCDFgsKi2xVSqm4UTgqqg-aqjrqqJuZW5xRuly5yGs5OKqMTIAHTYJzMLESKxBJJUgpDZMKI5AByTHybAAaiwADJFPh7MqHKy9bQUFpOS6WIy9BRyMbtKynXrXIzVOTWXQUnx+f5TIKzUKwATobh0ADC6Py7CxJX25WkGl6liU+jc7hclm+cl6NMqzgoJ1UesM+jsXUsfwB3JClD5AtW602EpxB1ARxUvRe+msvXOqnVbg1jwQln6FF6Bk02m9Bm+7MmgRmFooVsFzHYsJYAHEWAj7aVHRJpHcNBQZIMGqTVP1VLpNccZEo7EYlXJ9ApXqauXHgWQBGAYgA3PCoVIp7NSvGVc6ndSs+znJtdB4dSs63SaDSBxzyHTsjmkdAQOBiM0d0LUWgj3FO6RuOROCiKkkjXQtGfVlq6Wz2ayhp-3Rxt2NAqECzgssULnrmRz0pO1gfEYlYyHKC5WKohLDCG9TVMMCjDP+gI8pa-LcOB0qVNerraL0cpjKy1TyNWvpFtoUZ2HYuhuC0Gi4eanakN2fYDsRY5SC08qUtohijEqlHUv6ZLyi46iGO4ugqQ4ThcceYCCZelR2LWTbuMqTiqvIfodFITjamhnz9NoAzieMvjeEAA */
  clockModel.createMachine(
    {
      context: { times: [], currentTime: 0 },
      tsTypes: {} as import("./clockMachine.typegen").Typegen0,
      id: "clockMachine",
      initial: "idle",
      states: {
        idle: {
          on: {
            START: {
              target: "time_running",
            },
          },
        },
        time_running: {
          invoke: {
            src: (context) => (cb) => {
              const interval = setInterval(() => {
                cb("TICK");
              }, 100);

              return () => {
                clearInterval(interval);
              };
            },
          },

          on: {
            TICK: {
              actions: assign({
                currentTime: (context) =>
                  +(context.currentTime + 100).toFixed(2),
              }),
            },

            STOP_TIME: {
              target: "stop",
            },
            RESET: {
              actions: "resetTime",
            },
            SET_INTERVAL: {
              target: "interval",
            },
          },
        },
        stop: {
          on: {
            CLEAR: {
              target: "idle",
              actions: "clearAll",
            },
            RESET: {
              target: "time_running",
              actions: "resetTime",
            },
            CONTINUE: {
              target: "time_running",
            },
          },
        },
        interval: {
          entry: ["setInterval", send("START")],
          on: {
            START: {
              target: "time_running",
            },
          },
        },
      },
    },
    {
      actions: {
        clearAll: assign((context, event) => ({
          currentTime: 0,
          times: [],
        })),
        setInterval: assign((context, event) => ({
          times: context.times.concat([context.currentTime]),
          currentTime: 0,
        })),
        resetTime: assign((context, event) => ({
          currentTime: 0,
        })),
      },
    }
  );
