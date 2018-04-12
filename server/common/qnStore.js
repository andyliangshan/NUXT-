import qn from 'qn';
import { qnAccess } from '../config';

let qnClient = null;
if (qnAccess) {
  qnClient = qn.create(qnAccess);
}

export default qnClient;
