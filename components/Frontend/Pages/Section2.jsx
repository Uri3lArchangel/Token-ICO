import { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'; 
import 'chartjs-adapter-moment'; 
import Link from 'next/link'


let Data=[]

Chart.register(...registerables);
function BarChart(props) {
  const [holders,setHolders]=useState(0)
  let chart=null
  let d=new Date()
  let month= d.getMonth()
  Data[month]=props.h

  useEffect(() => {
    
    const canvas = document.getElementById('myChart')
    const ctx = canvas.getContext('2d')
    if(chart!=null){
        chart.destroy() 
    }
    const myChart = new Chart(ctx, { 
      type: 'bar',
     
      data: {
        labels: ["Janurary", "Feburary", "March", "April","May","June","July","August","September","October","November","December"],
        datasets: [{
          label: 'Months',
          data: Data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(10, 100, 192, 0.2)',
            'rgba(255, 255, 192, 0.2)',


          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(10, 100, 192, 1)',
            'rgba(255, 255, 192, 1)',


          ],
          borderWidth: 1, 
          
        }]
      },
      options: {
        
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }, 
          }],
          y:{
            ticks:{
              font:{
                size:11
              }
            },
            grid:{


                color:"rgba(0,0,0,0.1)"
            }
          },
          x:{
            ticks:{
              font:{
                size:10
              }
            },
            grid:{
                color:"rgba(0,0,0,0.1)"
            }
          }
        },
       
        
      }
    })
 
    chart=myChart


    console.log(props.h)

  }, [])
  return (
    <div className='canvasDiv '>  
    <div>
    <p className=''>Number Of THT Holders</p>
    <Link href='/'><button className='bg-black text-white flex px-5 py-1 rounded-full'> Home </button></Link>
    </div>
    <canvas id="myChart" height={1000} width={1000} ></canvas>   
    </div>
  );
};

export default BarChart;

