"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import Loader from "./Loader";
import { Word } from "@prisma/client";
import { handleGetCloudWordAction } from "../serverActions/HandleGetCloudWordAction";

const WordCloud = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [cloudWordData, setCloudWordData] = useState<Word[] | undefined>();
  useEffect(() => {
    const fetchWordCloudWords = async () => {
      setCloudWordData(await handleGetCloudWordAction());
    };
    fetchWordCloudWords();
  }, []);

  useLayoutEffect(() => {
    if (!cloudWordData) return;

    const root = am5.Root.new(chartRef.current!);

    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        categoryField: "content",
        valueField: "occurance",
      })
    );

    series.labels.template.setAll({
      fill: am5.color(0xa2aab7),
    });

    series.data.setAll(cloudWordData);
    return () => {
      root.dispose();
    };
  }, [cloudWordData]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "400px" }}
      className="flex items-center justify-center"
    >
      {!cloudWordData && <Loader />}
    </div>
  );
};

export default WordCloud;
