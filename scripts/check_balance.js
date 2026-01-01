const fs = require('fs');
const path = require('path');

const root = process.cwd();
const exts = ['.js','.jsx','.ts','.tsx','.mjs','.cjs','.json'];
const ignoreDirs = ['node_modules','.git','.next','out','android','build','dist'];

function walk(dir){
  const res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    if(e.isDirectory()){
      if(ignoreDirs.includes(e.name)) continue;
      res.push(...walk(path.join(dir,e.name)));
    } else {
      if(exts.includes(path.extname(e.name))) res.push(path.join(dir,e.name));
    }
  }
  return res;
}

function checkFile(file){
  const s = fs.readFileSync(file,'utf8');
  const stack = [];
  const pairs = {')':'(',']':'[','}':'{'};
  let inSingle=false, inDouble=false, inBack=false, inLineComment=false, inBlockComment=false, escape=false;
  for(let i=0;i<s.length;i++){
    const ch = s[i];
    const nxt = s[i+1];
    if(inLineComment){ if(ch==='\n') inLineComment=false; continue; }
    if(inBlockComment){ if(ch==='*' && nxt==='/' ){ inBlockComment=false; i++; continue;} else continue; }
    if(!inSingle && !inDouble && !inBack){
      if(ch==='/' && nxt==='/' ){ inLineComment=true; i++; continue; }
      if(ch==='/' && nxt==='*' ){ inBlockComment=true; i++; continue; }
    }
    if(!inLineComment && !inBlockComment){
      if(!inBack && ch === "'" && !inDouble){ inSingle = !inSingle; continue; }
      if(!inBack && ch === '"' && !inSingle){ inDouble = !inDouble; continue; }
      if(!inSingle && !inDouble && ch === '`'){ inBack = !inBack; continue; }
      if((inSingle||inDouble||inBack) && ch==='\\' && !escape){ escape = true; continue; }
      if(escape){ escape = false; continue; }

      if(!inSingle && !inDouble && !inBack){
        if(ch==='('||ch==='['||ch==='{'){ stack.push({ch, i}); }
        else if(ch===')'||ch===']'||ch==='}'){
          const top = stack.pop();
          if(!top || top.ch !== pairs[ch]){
            return { ok: false, pos: i, expected: top?pairs[ch]:null, found: ch };
          }
        }
      }
    }
  }
  if(stack.length>0) return { ok:false, pos: stack[stack.length-1].i, expected: stack[stack.length-1].ch, found: null };
  return { ok:true };
}

const files = walk(root);
let any=false;
for(const f of files){
  try{
    const res = checkFile(f);
    if(!res.ok){
      any=true;
      console.log(`MISMATCH in: ${path.relative(root,f)} -> pos:${res.pos} expected:${res.expected||'N/A'} found:${res.found||'EOF'}`);
    }
  }catch(err){
    console.error('Error reading',f,err.message);
  }
}
if(!any) console.log('No unbalanced parentheses/brackets/braces found.');
process.exit(any?2:0);
