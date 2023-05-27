import axios from 'axios';

const BASE_URL = 'https://recruiting.api.bemmbo.com/invoices/pending';

async function GetBills() {
  return (await axios.get(BASE_URL)).data;
}

export default { GetBills };
