import Confirmation, {
  Props as ConfimationProps,
} from '../../components/confirm/Confirmation';
import { createConfirmation } from 'react-confirm';

const defaultConfirmation = createConfirmation(Confirmation);

function confirm(
  options: ConfimationProps = {
    data: undefined,
  },
) {
  return defaultConfirmation({ ...options });
}

export default confirm;
