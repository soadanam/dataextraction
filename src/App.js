import React from 'react';

const LabTestResults = () => {
    const originalData = `H|\\^&||| XN-550^00-22^27619^^^^BD634545||||||||E1394-97
P|1||||^^|||U|||||^||||||||||||^^^
C|1||
O|1||^^ 574^M|^^^^WBC\\^^^^RBC\\^^^^HGB\\^^^^HCT\\^^^^MCV\\^^^^MCH\\^^^^MCHC\\^^^^PLT\\^^^^RDW-SD\\^^^^RDW-CV\\^^^^PDW\\^^^^MPV\\^^^^P-LCR\\^^^^PCT\\^^^^NEUT#\\^^^^LYMPH#\\^^^^MONO#\\^^^^EO#\\^^^^BASO#\\^^^^NEUT%\\^^^^LYMPH%\\^^^^MONO%\\^^^^EO%\\^^^^BASO%\\^^^^IG#\\^^^^IG%\\^^^^MICROR\\^^^^MACROR|||||||N||||||||||||||F
R|1|^^^^WBC^1|10.93|10*3/uL||N||F||||20240809204804
R|2|^^^^RBC^1|5.66|10*6/uL||N||F||||20240809204804
R|3|^^^^HGB^1|9.0|g/dL||W||F||||20240809204804
R|4|^^^^HCT^1|27.4|%||W||F||||20240809204804
R|5|^^^^MCV^1|48.4|fL||H||F||||20240809204804
R|6|^^^^MCH^1|15.9|pg||N||F||||20240809204804
R|7|^^^^MCHC^1|32.8|g/dL||N||F||||20240809204804
R|8|^^^^PLT^1|3762|10*3/uL||N||F||||20240809204804
R|9|^^^^NEUT%^1|58.1|%||N||F||||20240809204804
R|10|^^^^LYMPH%^1|37.0|%||N||F||||20240809204804
R|11|^^^^MONO%^1|2.9|%||N||F||||20240809204804
R|12|^^^^EO%^1|1.7|%||N||F||||20240809204804
R|13|^^^^BASO%^1|0.3|%||N||F||||20240809204804
R|14|^^^^NEUT#^1|6.35|10*3/uL||N||F||||20240809204804
R|15|^^^^LYMPH#^1|4.04|10*3/uL||N||F||||20240809204804
R|16|^^^^MONO#^1|0.32|10*3/uL||N||F||||20240809204804
R|17|^^^^EO#^1|0.19|10*3/uL||N||F||||20240809204804
R|18|^^^^BASO#^1|0.03|10*3/uL||N||F||||20240809204804
R|19|^^^^IG%^1|2.0|%||W||F||||20240809204804
R|20|^^^^IG#^1|0.22|10*3/uL||W||F||||20240809204804
R|21|^^^^RDW-SD^1|----|fL||A||F||||20240809204804
R|22|^^^^RDW-CV^1|26.9|%||H||F||||20240809204804`;

    const parseData = (data) => {
        const lines = data.split('\n');
        const results = [];
        let serial = 1;
        
        for (const line of lines) {
            if (line.startsWith('R|')) {
                const parts = line.split('|');
                const testName = parts[2].split('^1')[0].replace(/^(\^+)/, ''); 
                const value = parts[3];
                const unit = parts[4].replace('*', '<sup>') + '</sup>';
                const interpretation = mapInterpretation(parts[6]);

                results.push({ serial: serial++, testName, value, unit, interpretation });
            }
        }
        return results;
    };

    const mapInterpretation = (code) => {
        switch (code) {
            case 'N': return 'Normal';
            case 'W': return 'Low';
            case 'H': return 'High';
            case 'A': return 'Abnormal';
            default: return 'Unknown';
        }
    };

    const parsedData = parseData(originalData);

    return (
        <div style={{ textAlign: 'center', margin: '20px', paddingBottom: '10px' }}>
            <h2>Lab Test Results</h2>
            <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden',  backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#E4E4E4', color: '#000' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>SL</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Test Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Interpretation</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedData.map((test, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{test.serial}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{test.testName}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{test.value}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }} dangerouslySetInnerHTML={{ __html: test.unit }}></td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{test.interpretation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabTestResults;
