import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  DkimIdentity,
  EasyDkimSigningKeyLength,
  EmailIdentity,
  Identity,
  MailFromBehaviorOnMxFailure,
} from "aws-cdk-lib/aws-ses";
import { HostedZone, TxtRecord } from "aws-cdk-lib/aws-route53";

export interface SesStackProps extends StackProps {
  domain: string;
  email: string;
}

export class SesStack extends Stack {
  constructor(scope: Construct, id: string, props: SesStackProps) {
    super(scope, id, props);

    this.setEmailIdentity(props.email);
    this.setDomainIdentity(props.domain);

    Tags.of(this).add("CreatedBy", "CDK");
  }

  private setEmailIdentity(email: string): void {
    new EmailIdentity(this, "EmailIdentity", {
      identity: Identity.email(email),
    });
  }

  private setDomainIdentity(domain: string): void {
    const hostedZone = HostedZone.fromLookup(this, "Zone", { domainName: domain });
    new EmailIdentity(this, "DomainIdentity", {
      identity: Identity.publicHostedZone(hostedZone),
      dkimIdentity: DkimIdentity.easyDkim(EasyDkimSigningKeyLength.RSA_2048_BIT),
      mailFromBehaviorOnMxFailure: MailFromBehaviorOnMxFailure.USE_DEFAULT_VALUE,
      dkimSigning: true,
    });
    new TxtRecord(this, "DmarkRecord", {
      recordName: "_dmarc",
      values: ["v=DMARC1;p=quarantine"],
      zone: hostedZone,
    });
    new TxtRecord(this, "SpfRecord", {
      recordName: "",
      values: ["v=spf1 include:amazonses.com -all"],
      zone: hostedZone,
    });
  }
}
