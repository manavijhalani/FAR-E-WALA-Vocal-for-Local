import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './category.css';

const itemData = [
  {
    img: 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6',
    title: 'Vegetable',
    author: '',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/10/31/Photos/Processed/fruits-kFLF--621x414@LiveMint.jpg',
    title: 'Fruits',
    author: '',
  },
  {
    img: 'https://bansaloilandfoods.com/wp-content/uploads/2023/01/Most-popular-street-food-in-india-1.jpg',
    title: 'Street Food',
    author: '',
  },
  {
    img: 'https://www.allrecipes.com/thmb/SI6dn__pfJb9G5eBpYAqkyGCLxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50050-five-minute-ice-cream-DDMFS-4x3-076-fbf49ca6248e4dceb3f43a4f02823dd9.jpg',
    title: 'Ice cream',
    author: '',
    cols: 2,
  },
];

export default function TitlebarImageList() {
  return (
    <div className="fullscreen-bg">
        <br></br><br></br>
        <h1 className="header">Select Your Category</h1>
        <ImageList sx={{ width: 800, height: 450, marginLeft: 40, marginTop: 5 }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} className="imageItem">
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`Info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
  );
}
