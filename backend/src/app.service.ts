import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers'
import * as ballotJson from './assets/TokenizedBallot.json'
import * as tokenJson from './assets/MyERC20Votes.json'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {

  provider: ethers.providers.Provider;
  contract: ethers.Contract;
  ballotContract: ethers.Contract;
  deployer;
  constructor(private configService: ConfigService) {
    this.provider = ethers.getDefaultProvider('sepolia', {
      alchemy: this.configService.get<string>('ALCHEMY_API_KEY'),
      etherscan: this.configService.get<string>('ETHERSCAN_API_KEY'),
      infura: this.configService.get<string>('INFURA_API_KEY')
    });
    this.contract = new ethers.Contract(this.configService.get<string>("TOKEN_ADDRESS"), tokenJson.abi, this.provider);
    this.ballotContract = new ethers.Contract(this.configService.get<string>("BALLOT_ADDRESS"), ballotJson.abi, this.provider)
    const wallet = new ethers.Wallet(this.configService.get<string>('PRIVATE_KEY') ?? "")
    this.deployer = wallet.connect(this.provider)
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getResult(index: number) {
    const proposal = await this.ballotContract.proposals(index)
    return { "vote": ethers.utils.formatUnits(proposal.voteCount) }
  }
  async getWinner() {
    return { "winner": ethers.utils.parseBytes32String(await this.ballotContract.winnerName()) }
  }
  async requestMint(address: string, amount: string) {
    const voter1tx = await this.contract.connect(this.deployer).mint(address, ethers.utils.parseUnits(amount));
    const voter1rcpt = await voter1tx.wait();
    return { "Transaction_hash": voter1rcpt.transactionHash }
  }
}
