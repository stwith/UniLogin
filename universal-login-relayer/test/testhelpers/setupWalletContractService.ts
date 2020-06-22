import {providers} from 'ethers';
import {ContractService, ProviderService} from '@unilogin/contracts';
import {Beta2Service} from '../../src/integration/ethereum/Beta2Service';
import {GnosisSafeService} from '../../src/integration/ethereum/GnosisSafeService';
import {WalletContractService} from '../../src/integration/ethereum/WalletContractService';
import {TransactionGasPriceComputator} from '../../src/integration/ethereum/TransactionGasPriceComputator';
import {getMockedGasPriceOracle} from '@unilogin/commons/testutils';

export const setupWalletContractService = (provider: providers.Provider) => {
  const providerService = new ProviderService(provider);
  const contractService = new ContractService(providerService);
  const transactionGasPriceComputator = new TransactionGasPriceComputator(getMockedGasPriceOracle());
  const beta2Service = new Beta2Service(provider, transactionGasPriceComputator);
  const gnosisSafeService = new GnosisSafeService(provider, transactionGasPriceComputator);
  return new WalletContractService(contractService, beta2Service, gnosisSafeService);
};
