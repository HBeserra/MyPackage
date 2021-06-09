import Delivery from './_delivery_truck'
import SkyLine from './_skyline'

import Logo from '../icons/briefcase'
import cn from 'classnames'
import styles from './Banner.module.scss'

const Banner = ({ ...props }) => {

	return (
		<div className={styles.banner}>
			<div class_name={styles.banner.left} >
				<p class_name={styles.banner.left}>ola</p>
				<i>ola</i>
				<i>ola</i>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
			</div>
			<i>ola</i>
				<i>ola</i>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
				<Logo/>
		</div>
	)
}

export default Banner