import qn from 'qn';
import { qnAccess } from '../../config';

let qnClient = null; //eslint-disable-line

if (qnAccess) {
  qnClient = qn.create(qnAccess);
}

export default qnClient;
