const charge =(e)=>{
    e.preventDefault();

    let title= document.getElementById('title').value;
    let author= document.getElementById('author').value;
    let desc= document.getElementById('desc').value;

    let inputs= document.querySelectorAll('input');
    

    const story = {
        "title": title,
        "author": author,
        "description":desc
    }
  
    

    fetch('/stories',{
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
          },
        body: JSON.stringify(story)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
       // console.log(data)
    })

    inputs.forEach((input)=>{
        input.value='';
    })
    document.getElementById('desc').value="";
  }

const showAll =()=>{
    fetch('/stories',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        return res.json()
    }).then((data)=>{

        let output =`<table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">TITLE</th>
            <th scope="col">AUTHOR</th>
            <th scope="col">DESC</th>
          </tr>
        </thead>
        <tbody>`
        
      
        data.forEach((story)=>{

           output+= `<tr>
            <th scope="row">${story.id}</th>
            <td id="table_id">${story.title}</td>
            <td id="table_title">${story.author}</td>
            <td id="table_author">${story.desc}</td>
          </tr>`

        })

        document.getElementById('table-output').innerHTML= output+ `</tbody>
        </table>`;
        //use this data to pooulate the table
       

        console.log(data)
    })

    console.log()
}

  document.getElementById('save-btn').addEventListener('click', charge)
  document.getElementById('show-all').addEventListener('click', showAll)
 