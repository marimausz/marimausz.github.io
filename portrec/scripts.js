const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');        

const centroX = 600;
const centroY = 300;
const orbt_sz = 250;        //raio da órbita da terra
const orbl_sz = 30;         //raio da órbita da lua
const sol_sz = 50;          //tamanho do sol
const lua_sz = 5;           //tamanho da lua
const lua2_sz = 6;          //tamanho da lua
const lua3_sz = 7;          //tamanho da lua
const terra_sz = 15;        //tamanho da terra

const t_terra = 120;         //tempo em segundos para uma volta da terra
const t_lua = 15;             //tempo em segundos para uma volta da terra
const t_lua2 = 10;             //tempo em segundos para uma volta da terra
const t_lua3 = 5;             //tempo em segundos para uma volta da terra

const tau = 2*Math.PI;

const sol = new Path2D();
const lua = new Path2D();
const lua2 = new Path2D();
const lua3 = new Path2D();
const terra = new Path2D();

function init(){
    sol.arc(0, 0, sol_sz, 0, tau, false);
    lua.arc(0, 0, lua_sz, 0, tau, false);
    lua2.arc(0, 0, lua2_sz, 0, tau, false);
    lua3.arc(0, 0, lua3_sz, 0, tau, false);
    terra.arc(0, 0, terra_sz, 0, tau, false);

    window.requestAnimationFrame(draw);
}

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1200,600);

    ctx.save();     //salva estado atual antes do desenho

    //sol;
    ctx.translate(centroX,centroY);
    ctx.fillStyle="yellow";
    ctx.fill(sol);
    ctx.restore();

    //terra
    ctx.save();
        ctx.translate(centroX,centroY);

        const time = new Date();

        ctx.rotate((tau/t_terra) * time.getSeconds() + (tau/(t_terra*1000))*time.getMilliseconds() );
        ctx.translate(orbt_sz, 0);

        ctx.fillStyle = "pink";
        ctx.fill(terra);

        //lua
        ctx.save();

            ctx.rotate((tau/t_lua) * time.getSeconds() + (tau/(t_lua*1000))*time.getMilliseconds() );
            ctx.translate(0, orbl_sz);

            ctx.fillStyle = "purple";
            ctx.fill(lua);

        ctx.restore();

        //lua2
        ctx.save();

            ctx.rotate((tau/t_lua2) * time.getSeconds() + (tau/(t_lua2*1000))*time.getMilliseconds() );
            ctx.translate(0, orbl_sz*1.5);

            ctx.fillStyle = "purple";
            ctx.fill(lua);
            ctx.restore();
        //lua3
        ctx.rotate((tau/t_lua3) * time.getSeconds() + (tau/(t_lua3*1000))*time.getMilliseconds() );
        ctx.translate(0, orbl_sz*1.20);

        ctx.fillStyle = "purple";
        ctx.fill(lua);
        ctx.restore();




    window.requestAnimationFrame(draw);



}

init();

const uid = document.getElementById ('uid');
const tel = document.getElementById ('tel');
const email = document.getElementById ('email');
const pwd = document.getElementById ('pwd');
const pwd2 = document.getElementById ('pwd2');
const nome = document.getElementById ('nome');
const cpf = document.getElementById ('cpf');
const nasc = document.getElementById ('nasc');
const lic = document.getElementById ('lic');

function validate(item){
    item.setCustomValidity('');     //limpa validações anteriores;
    item.checkValidity();           //reexecuta validação;    

    if(item == cpf){
        let numcpf = cpf.value.replace(/[^0-9]/g, "");
        //sinais de pontuação, deixando somente o algaritmo de 0 a 9.
        if(validateCPF(numcpf)) {
            item.setCustomValidity('');
        }else{
            item.setCustomValidity('CPF inválido');
        }
    }

    if (item == pwd2){
        if (item.value === pwd.value){
            item.setCustomValidity('');     //limpa validação;
        }else{
            item.setCustomValidity('Dá um jeito nessa senha, não tá batendo com a anterior.');
        }
    }

    if (item == nasc){
        let hoje = new Date();      //obtém data atual;
        let dnasc = new Date(nasc.value);

        let idade = hoje.getFullYear() - dnasc.getFullYear();
        let m = hoje.getMonth() - dnasc.getMonth();
        if (m < 0 || (m == 0 && hoje.getDate() < dnasc.getDate() )){
            idade--;
        }
        if (idade >= 0){
            document.getElementById('idade').value = idade + " anos";
        }else{
            document.getElementById('idade').value = idade + "Ainda não nascido.";
        }
        if (idade < 18){
            item.setCustomValidity('Você prescissa mentir sua idade.')
        }else if (idade > 130) {
            item.setCustomValidity('Você não deve exagerar ao mentir sua idade')
        }
    }
}

function validateCPF(cpf){
    var number, digits, sum, i, result, equal_digits;
    equal_digits = 1;

    if (cpf.length < 11)
        return false;

    for (i = 0; i < cpf.length - 1; i++)

        if (cpf.charAt(i) != cpf.charAt(i + 1)){
            equal_digits = 0;
            break;
        }

    if (!equal_digits){
        number = cpf.substring(0,9);
        digits = cpf.substring(9);
        sum = 0;

    for (i = 10; i > 1; i--)
        sum += number.charAt(10 - i) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
                                
    if (result != digits.charAt(0))
        return false;
        number = cpf.substring(0,10);
        sum = 0;

    for (i = 11; i > 1; i--)
        sum += number.charAt(11 - i) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(1))
        return false;
        return true;
    }else
        return false;
}

function maskCPF(){
    let strCPF = cpf.value;
    if(strCPF.length == 3 || strCPF.length == 7) cpf.value += '.';
    if(strCPF.length == 11) cpf.value += '-';
    validate(cpf);
}

function maskTEL(){
    let strTEL = tel.value;
    if(strTEL.length == 2) tel.value = '(' + tel.value + ') ';
    if(strTEL.length == 9) tel.value += '-';
    if(strTEL.length == 15 && strTEL[9] == "-"){
        tel.value = strTEL.substring(0,9)+strTEL[10]+"-"+strTEL.substring(11);
}
}

uid.addEventListener    ('input', function(){validate(uid)  });
pwd.addEventListener    ('input', function(){validate(pwd)  });
pwd2.addEventListener   ('input', function(){validate(pwd2) });
nome.addEventListener   ('input', function(){validate(nome) });
nasc.addEventListener   ('input', function(){validate(nasc) }); 

cpf.addEventListener    ('input', maskCPF);
tel.addEventListener    ('input', maskTEL);

pwd.addEventListener('invalid', function(){
    if (pwd.value === ''){
        pwd.setCustomValidity("Insira uma senha!");
    } else {
        pwd.setCustomValidity("A senha deve conter pelo menos 8 caracteres: uma letra maiúscula, uma letra minúscula e um número.")
    }
})