import config from './config.json';

// @ts-ignore
const Dashboard = ({ investigations, bpns, companies }) => {
    return (
        <main>
            <div className="pricing-header p-3 pb-md-3 mx-auto text-center">
                <h1 className="display-4 fw-normal">{config.title}</h1>
                <p className="fs-5 text-muted">Some description for this application.</p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                    <div className="card mb-3 rounded-3 shadow-sm">
                        <div className="card-header py-1">
                            <h4 className="my-0 fw-normal">Investigations</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">{investigations}<small
                                className="text-muted fw-light"> registered</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li className="text-danger">x with impact</li>
                                <li className="text-success">x with no impact</li>
                            </ul>
                        </div>
                    </div>
                </div >
                <div className="col">
                    <div className="card mb-3 rounded-3 shadow-sm">
                        <div className="card-header py-1">
                            <h4 className="my-0 fw-normal">BPNs</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">{bpns}<small
                                className="text-muted fw-light"> registered</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li className="text-info">x involved in investigations</li>
                                <li className="text-secondary">x without investigation</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-3 rounded-3 shadow-sm">
                        <div className="card-header py-1">
                            <h4 className="my-0 fw-normal">Companies</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">{companies}<small
                                className="text-muted fw-light"> registered</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li className="text-info">x involved in investigations</li>
                                <li className="text-secondary">x without investigation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </main >
    );
}

export default Dashboard;
