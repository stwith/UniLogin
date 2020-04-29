import Relayer, {RelayerClass, addRefundPayer} from '@unilogin/relayer';
import {providers, utils} from 'ethers';
import {TEST_REFUND_PAYER} from '@unilogin/commons';

export const withENS = (provider: providers.JsonRpcProvider, ensAddress: string) => {
  const chainOptions = {name: 'ganache', ensAddress, chainId: 0} as utils.Network;
  return new providers.JsonRpcProvider(provider.connection.url, chainOptions);
};

export async function startDevelopmentRelayer(
  configuration: any,
  provider: providers.JsonRpcProvider,
  RelayerConstructor: RelayerClass = Relayer,
) {
  const providerWithENS = withENS(provider, configuration.chainSpec.ensAddress);
  const relayer = new RelayerConstructor(configuration, providerWithENS);
  await relayer.start();
  await addRefundPayer(relayer, TEST_REFUND_PAYER);
  console.log(`         Relayer url: http://localhost:${configuration.port}`);
  return relayer;
}
