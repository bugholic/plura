"use client";

import { getPipelines } from "@/lib/queries";
import { Prisma } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  subaccountId: string;
};

const PipelineValue = ({ subaccountId }: Props) => {
  const [pipelines, setPipelines] = useState<
    Prisma.PromiseReturnType<typeof getPipelines>
  >([]);

  const [selectedPipelineId, setSelectedPipelineId] = useState("");
  const [pipelineClosedValue, setPipelineClosedValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPipelines(subaccountId);
      setPipelines(res);
      setSelectedPipelineId(res[0]?.id);
    };
    fetchData();
  }, [subaccountId]);

  const totalPipelineValue = useMemo(() => {
    if (pipelines.length) {
      return (
        pipelines
          .find((pipeline) => pipeline.id === selectedPipelineId)
          ?.Lane.reduce((totalLane, lane, currentLaneIndex, array) => {
            const laneTicketsTotal = lane.Tickets.reduce(
              (totalTickets, ticket) => totalTickets + Number(ticket?.value),
              0
            );
            if (currentLaneIndex === array.length - 1) {
              setPipelineClosedValue(laneTicketsTotal || 0);
            }
            return totalLane + laneTicketsTotal;
          }, 0) || 0
      );
    }
    return 0;
  }, [selectedPipelineId, pipelines]);

  const pipelineRate = useMemo(
    () =>
      (pipelineClosedValue / (totalPipelineValue + pipelineClosedValue)) * 100,
    [pipelineClosedValue, totalPipelineValue]
  );

  return (
    <Card className="relative w-full xl:w-[350px]">
      <CardHeader>
        <CardDescription>Pipleline Values</CardDescription>
        <small className="text-xs text-muted-foreground">
          Pipeline Progress
        </small>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Closed ${pipelineClosedValue}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Total ${totalPipelineValue + pipelineClosedValue}
            </p>
          </div>
        </div>
        <Progress color="green" value={pipelineRate} className="h-2" />
      </CardHeader>
      <CardContent className="text-sm ">
        <p className="mb-2">
          Total value of all tickets in the given pipeline except the last lane.
          Your last lane is considered your closing lane in every pipeline.
        </p>
        <Select
          value={selectedPipelineId}
          onValueChange={setSelectedPipelineId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pipeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pipelines</SelectLabel>
              {pipelines.map((pipeline) => (
                <SelectItem value={pipeline.id} key={pipeline.id}>
                  {pipeline.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PipelineValue;
