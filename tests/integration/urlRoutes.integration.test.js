import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from "supertest";
import app from '../../src/app.js';
import {map} from '../../src/controllers/urlController.js';

describe('Integration test for /api/urls',()=>{
          beforeEach(()=>{
                map.clear();
                global.map = map;
          });
           it('POST /api/urls without originalUrl',async()=>{
                
                const res = await request(app)
                          .post('/api/urls')
                          .set("Content-Type", "application/json");
                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe("Invalid Input");
                
                
          });
          it('POST /api/urls with originalUrl',async()=>{
                const bodyData = {originalUrl : "www.google.com"};
                const res = await request(app)
                          .post('/api/urls')
                          .send(bodyData)
                          .set("Content-Type", "application/json");
                expect(res.statusCode).toBe(200);
                expect(res.body.result).toBe("completed successfully");
                expect(res.body.shortenUrl).toBe(1);
                
          });
          it('GET /api/urls ',async()=>{
                map.set(1,"www.google.com");
                map.set(2,"www.facebook.com");
                map.set(3,"www.youtube.com");
                const res = await request(app)
                          .get('/api/urls')
                          .set("Content-Type", "application/json");
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual({ 1: "www.google.com", 2: "www.facebook.com", 3:"www.youtube.com" });
                
                
          });
});


describe('Integration test for /api/:shortenUrl',()=>{
         beforeEach(()=>{
                map.clear();
                global.map = map;
                map.set(1,"www.google.com");

          });
          it('GET /api/:shortUrl',async ()=>{
               const res = await request(app)
                           .get("/api/1")
                           .send()
                           .set("Content-Type", "application/json");
               expect([301, 302]).toContain(res.statusCode);
               expect(res.headers.location).toBe('https://www.google.com');
              
          })
})