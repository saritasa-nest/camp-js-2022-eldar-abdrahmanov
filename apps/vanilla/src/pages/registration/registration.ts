import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Form, InputValues } from '../../components/form/form';

function handleFormSubmit(data: InputValues) {
  console.log(data)
}
const registrationForm = new Form({ formSelector: '.registration-form', handleFormSubmit });


