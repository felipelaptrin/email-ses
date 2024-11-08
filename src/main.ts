#!/usr/bin/env ts-node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SesStack } from "./stack/ses";
import { devProps } from "./config";

const app = new cdk.App();

new SesStack(app, "SesStack", devProps);
