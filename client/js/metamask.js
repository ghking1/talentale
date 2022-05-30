/*
现在的价格关系如下：

1Talent == 0.00001 Matic

购买简历 10Talent
发布工作  3Talent
推荐工作  1Talent
推荐成功 10Talent

铸造简历 免费，但会调起钱包，会产生Gas费
销售简历 免费
发送简历 免费，但会调起钱包，会产生Gas费
*/


var myweb3 = null;
var cur_account = null;

var talent_card_contract = null;
//var talent_card_address = "0x8aE39d5FDc075D05e7b453268AD926b397DBcC2b";
var talent_card_address = "0x7315aF2b99F6735af5CDE44a3dC94853c278e507";
var talent_card_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"card_id","type":"uint256"},{"internalType":"uint256","name":"num","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"connector","type":"address"}],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"destroy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"payfun","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var talent_card_owner = "0x13e37Fd316A245eCCcfd650e95bE3e6A0036D9Ed";

var huilv = 10000000000000;  //1Talent == 10^13Wei == 0.00001 Matic


function connect_metamask()
{
    if (window.ethereum) {
      window.ethereum.enable()
          .catch(function(reason) {
              if (reason === "User rejected provider access") {
                  // 用户拒绝登录后执行语句；
                  alert("You rejected access to metamask");
              } else {
                  // 本不该执行到这里，但是真到这里了，说明发生了意外
                  alert("There was a problem signing you in");
              }
          }).then(function(accounts) {
              myweb3 = new Web3(window.ethereum);
              myweb3.eth.getChainId()
              .then(function(chain_id) {
                if(chain_id == 80001) {
                  cur_account = accounts[0];
                  talent_card_contract = new myweb3.eth.Contract(talent_card_abi, talent_card_address);
                  js2dart_set_metamask_account(cur_account);
                } else {
                  alert("Please connect to Polygon Testnet!");
                }
              })
          });
    } else {
      alert("Please install MetaMask!");
    }

    return;
}

function mint_card(num)
{
    talent_card_contract.methods
    .mint(num)
    .send({from: cur_account, value: 0}, function(error){
      if(error) {
          js2dart_set_function_result('set_mint_card_result', -1)
      } else {
          js2dart_set_function_result('set_mint_card_result', 0)
      }
    });
}

function buy_card(from, to, card_id, num, price, connector)
{
    if(!connector)
    {
        connector = "0x0000000000000000000000000000000000000000";
    }

    price = price * huilv;

    talent_card_contract.methods
    .buy(from, to, card_id, num, price, connector)
    .send({from: cur_account, value: (connector==null ? price : price + 10*huilv)}, function(error){
        if(error) {
          js2dart_set_function_result('set_buy_card_result', -1)
        } else {
          js2dart_set_function_result('set_buy_card_result', 0)
        }
    });
}

function send_card(from, to)
{
    talent_card_contract.methods
    .safeTransferFrom(from, to, from, 1, "0x00")
    .send({from: cur_account, value: 0}, function(error, result){
        if(error) {
          js2dart_set_function_result('set_send_card_result', -1)
        } else {
          js2dart_set_function_result('set_send_card_result', 0)
        }
    });
}

function post_job()
{
    myweb3.eth.sendTransaction({from: cur_account, to: talent_card_owner, value: 3*huilv}, (err, res) => {
        if (err) {
          js2dart_set_function_result('set_post_job_result', -1)
        } else {
          js2dart_set_function_result('set_post_job_result', 0)
        }
    });
}

function match()
{
    myweb3.eth.sendTransaction({from: cur_account, to: talent_card_owner, value: huilv}, (err, res) => {
        if (err) {
          js2dart_set_function_result('set_match_result', -1)
        } else {
          js2dart_set_function_result('set_match_result', 0)
        }
    });
}
