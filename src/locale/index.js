import LocalizedStrings from 'react-localization';

import en from './en';
import pl from './pl';

const locales = { en, pl };

const strings = new LocalizedStrings(locales);

export default strings;
