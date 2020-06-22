import {Message} from '@unilogin/commons';
import {calculateBaseGas, ContractService} from '@unilogin/contracts';

export class GasComputation {
  constructor(private contractService: ContractService) {
  }

  async calculateBaseGas(message: Omit<Message, 'gasLimit'>) {
    const networkVersion = await this.contractService.fetchHardforkVersion();
    const walletVersion = await this.contractService.fetchWalletVersion(message.from);
    return calculateBaseGas(message, networkVersion, walletVersion);
  }
}
