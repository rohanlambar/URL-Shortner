import {createShortUrl, redirectToOriginalUrl ,giveAllMapEntries} from '../../src/controllers/urlController.js';
import {map } from '../../src/controllers/urlController.js';

const mockResponse = ()=>{
      const res = {};
       res.status = jest.fn().mockReturnValue(res);
       res.json = jest.fn().mockReturnValue(res);
       res.redirect = jest.fn().mockReturnValue(res);
       return res;
}

describe("testing createShortUrl ",()=>{
       beforeEach(()=>{
        // Reset map before each test 
          map.clear();
          global.map = map;
       })
       it('should return Invalid input for no originalUrl send in request ',async ()=>{
         const req = {body : {}};
         const res = mockResponse();
         await createShortUrl(req,res);
         expect(res.status).toHaveBeenCalledWith(400);
         expect(res.json).toHaveBeenCalledWith({error : "Invalid Input"});
       });
       it('should return 200 if originalUrl send in request ',async()=>{
         const req = {body : {originalUrl : "www.google.com"}};
         const res = mockResponse();
         await createShortUrl(req,res);
         expect(res.status).toHaveBeenCalledWith(200);
         expect(res.json).toHaveBeenCalledWith({result : "completed successfully", shortenUrl : 1});
         expect(map.get(1)).toBe('www.google.com');
       });
       it('should return 200 for multiple entires ' , async()=>{
          map.set(1,"www.google.com") // setting intial entry
          const req = {body : {originalUrl : "www.facebook.com"}};
          const res = mockResponse();
          await createShortUrl(req,res);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({result : "completed successfully", shortenUrl : 2});
          expect(map.get(2)).toBe('www.facebook.com');

       })
       
})


describe("testing redirectToOriginalUrl ",()=>{
       beforeEach(()=>{
         map.clear();
         global.map = map;
       });
       it('should return 200 if originalUrl send in request',async()=>{
           map.set(1,'www.google.com');
           const req = {params : {shortUrl : "1" }};
           const res = mockResponse();
           await redirectToOriginalUrl(req,res);
           expect(res.status).toHaveBeenCalledWith(301);
           expect(res.redirect).toHaveBeenCalledWith('https://www.google.com');
       });
});

describe("testing giveAllMapEntries ",()=>{
       beforeEach(()=>{
        map.clear();
        global.map = map;
       });
       it("should return 200 and entries in map ",async ()=>{
        map.set(1,"www.google.com");
        map.set(2,"www.facebook.com");
        const req = {};
        const res = mockResponse();
        await giveAllMapEntries(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "1": "www.google.com",
            "2": "www.facebook.com"
          })
       });
})