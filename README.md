# email-ses
This is a demo repository for my [blog post](https://felipetrindade.com/ses/).

## Running this project
The only dependency needed to start using this project is [Devbox](https://www.jetify.com/devbox) and [Nix](https://nixos.org/download/) (if you install Devbox first it will install Nix for you if you don't have it), all the other tools will be installed by it. Make sure your AWS region was already CDK bootstrapped.

1) Export AWS credentials

2) Install tools

```sh
devbox shell
```

3) Install dependencies

```sh
yarn
```

4) Modify the variables

Modify the `src/config/dev.config.ts`

5) Deploy the stack

```sh
yarn cdk deploy
```