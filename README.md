# scaler

Scales font-size on html element using provided "segments" in options which allows enpowered rem font-size unit usage.

## installation

Install directly from git

```bash
npm install kociolekt/scaler
```

## usage
Import and create instance. Scaling feature is enabled now! Use font-size with rem unit and chceck it out.
```javascript
import Scaler from 'scaler';

this.scaler = new Scaler(); // starts scaling
```
```css
font-size: 3.5rem;
```

Use events if needed
```javascript
this.scaler.on('changed', () => {
  // fired when font-size on html has been changed
});
```
```javascript
this.scaler.on('changed.segment', () => {
  // fired when current segment was changed
});
```

This is [on GitHub](https://github.com/kociolekt/scaler) so let me know if I've b0rked it somewhere.
