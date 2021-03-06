import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Plot from 'react-plotly.js';
/*
Store
 */
import {fetchNodeLocations, selectNodeLocations} from '~store/slices/getNodeLocationsSlice';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Config
 */
import {STATUS} from '~config/constants';
import { styles } from '~config/chart';



export default function NodeLocations() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectNodeLocations);

	useEffect(() => {
		dispatch(fetchNodeLocations());
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<>
				<div>
					<p className="color-grey">Active Nodes:</p>
					<p className="font-16 font-secondary-bold">500</p>
				</div>
				<div className="node-locations-chart">
					<Plot
						data={[
							{
								values: data?.locationValues,
								labels: data?.locationLabels,
								type: 'pie',
								hole: .15,
								marker: {
									colors: ['#687EFF', '#1A70FE', '#4FF0D7', '#323232', '#D69F4D'],
									line: {
										color: '#FFFFFF',
										width: [1, 1, 1, 1, 1, 1],
									}
								},
								textinfo: 'label',
								hoverinfo: 'value',
							}
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: true,
							legend: {
								x: 1,
								y: 1,
							},
							margin: {t: 10, r: 0, b: 0, l: 0},
							font: styles.font,
							paper_bgcolor: 'transparent',
							plot_bgcolor: 'transparent',
							xaxis: {
								visible: false,
							},
							yaxis: {
								visible: false,
							},
						}}
						config={styles.config}
						style={styles.style}
					/>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}