let endVal;
let down;
function UpdateBrand()
{
   let check = document.myForm.Model;
   for(let i = 0; i < check.length;i++)
   {
       check[i].checked = false;
   }
   UpdateStatus();
}

function UpdateStatus()
{
   let elm = document.getElementById("select");
   let size = window.getComputedStyle(elm,null).getPropertyValue("height");
   let output = document.getElementById('status');
   down = document.myForm.downpayment.value;
   let brand = document.myForm.Moto;
   let model =document.myForm.Model;
   let options = document.querySelectorAll('input[type = "checkbox"]:checked');
   let modelSelect = false;
   let index;
   let sum = 0;

   document.getElementById("images").style.height = size;
   document.getElementById("images").style.width = '100px';

   for(let i = 0 ; i < model.length;i++)
   {
       if(model[i].checked)
       {
          modelSelect = true;
          index = i;
       }
   }

   for(let i = 0; i < options.length;i++)
   {
       if(options[i].checked)
           sum+=parseFloat(options[i].value);
   }
   if(isNaN(down))
   {
    output.innerHTML = "invalid Downpayment";
    down.focus();
    down.select();
    return false;
   }
   else if(brand.selectedIndex == -1)
   {
    output.innerHTML = " No Brand Selected";
    return false;
   }
   else if(modelSelect == false)
   {
    output.innerHTML = " No Model Selected";
    return false;
   }
   else
   {
       if(brand.selectedIndex == 1 && index == 0)
       {
           document.getElementById("images").src = 'images/images_ica6/EuroScooter.jpg';
       }
       else if (brand.selectedIndex == 2 && index == 0)
       {
           document.getElementById("images").src = 'images/images_ica6/JapaneseScooter.jpg';
       }
       else if (brand.selectedIndex == 3 && index == 0)
       {
           document.getElementById("images").src = 'images/images_ica6/AmericanScooter.jpg';
       }
       else if (brand.selectedIndex == 1 && index == 1)
       {
           document.getElementById("images").src = 'images/images_ica6/EuroNaked.jpg';
       }
       else if (brand.selectedIndex == 2 && index == 1)
       {
           document.getElementById("images").src = 'images/images_ica6/JapaneseNaked.jpg';
       }
       else if (brand.selectedIndex == 3 && index == 1)
       {
           document.getElementById("images").src = 'images/images_ica6/AmericanNaked.jpg';
       }
       else if (brand.selectedIndex == 1 && index == 2)
       {
           document.getElementById("images").src = 'images/images_ica6/EuroSport.jpg';
       }
       else if (brand.selectedIndex == 2 && index == 2)
       {
           document.getElementById("images").src = 'images/images_ica6/JapaneseSport.jpg';
       }
       else
       {
           document.getElementById("images").src = 'images/images_ica6/AmericanSport.jpg';
       }
       if(down === "")
       {
        endVal= parseFloat(model.value) + parseFloat(sum);
        down = 0;
        output.innerHTML = `Selection :${brand.value} :${model.value}:${options.length} options selected <br>$${model.value}+$${sum}-$0 = $${endVal}`;
       }
       else
       {
        let diffendVal= parseFloat(model.value) + parseFloat(sum) - parseFloat(down);
        output.innerHTML = `Selection :${brand.value} :${model.value}:${options.length} options selected <br>$${model.value}+$${sum}-$${down} = $${diffendVal}`;
       }    
   }


}

function UpdateModel()
{
    if(this.value < 10000)
    {
        document.myForm.ABS.checked = false;
        document.myForm.TCS.checked = false;
        document.myForm.FMM.checked = false;
    }
    UpdateStatus();
}

function Validate()
{
    let value = UpdateStatus();
    if(value == false)
       return false;
    if(down < endVal/2)
    {
        document.getElementById('status').innerHTML = `(Min ${endVal/2})`;
        document.myForm.downpayment.focus();
        document.myForm.downpayment.select();
       return false
    }
    document.myForm.totalcost.value = endVal;
    return true;
}
window.onload = function()
{
    document.myForm.Moto.onchange = UpdateBrand;
    let check = document.myForm.Model;
    for(let i = 0; i < check.length;i++)
    {
        check[i].onclick = UpdateModel;
    }
    document.myForm.ABS.onclick =() => UpdateStatus();
    document.myForm.TCS.onclick = () => UpdateStatus();
    document.myForm.FMM.onclick = () => UpdateStatus();
    document.myForm.downpayment.onchange = () => UpdateStatus();
    document.myForm.onsubmit = Validate;
    UpdateStatus();
}