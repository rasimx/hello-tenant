import { header, active } from './Header.module.scss';
import classNames from "classnames";

export interface Props {
  title: string | undefined
}

function Header({title}: Props) {

  return (
    <div className={classNames(header, {[active]: !!title})}>
      {title || 'No tenant'}
    </div>
  )
}

export default Header
